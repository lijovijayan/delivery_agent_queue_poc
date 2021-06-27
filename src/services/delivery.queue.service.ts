import { TABLE } from "../constants";
import { IAgent } from "../types/agent";
import { connection } from "./mysql.service";

export class Agent {
  public getAllAgentDetails() {
    const query = `SELECT * FROM ${TABLE.name}`;
    return new Promise<IAgent[]>((resolve, reject) => {
      connection.query(query, (error, results, fields) => {
        if (error) reject(error);
        const details = results.map((agent) => {
          return { ...agent, AVAILABLE: agent.AVAILABLE === 1 ? true : false };
        });
        resolve(details);
      });
    });
  }
  public assignDeliveryAgent(orderId: number) {
    const query = `SELECT ${TABLE.columns.AGENT_ID} FROM ${TABLE.name} 
      WHERE ${TABLE.columns.ITEMS_DELIVERED}=(
          SELECT MIN(${TABLE.columns.ITEMS_DELIVERED}) FROM ${TABLE.name} 
          WHERE ${TABLE.columns.AGENT_ID} IN (
              SELECT ${TABLE.columns.AGENT_ID} FROM 
              ${TABLE.name} WHERE ${TABLE.columns.AVAILABLE}=true
      )) LIMIT 1`;
    return new Promise((resolve, reject) => {
      try {
        connection.query(query, (error, results, fields) => {
          if (error) reject(error);
          const agentId = results?.[0]?.[TABLE.columns.AGENT_ID];

          if (agentId && agentId > 0) {
            const updateQuery = `UPDATE ${TABLE.name} 
                SET ${TABLE.columns.AVAILABLE}=false, ${TABLE.columns.ORDER_ID}=${orderId}, 
                ${TABLE.columns.ITEMS_DELIVERED}=${TABLE.columns.ITEMS_DELIVERED} + 1
                WHERE ${TABLE.columns.AGENT_ID}=${agentId}`;
            connection.query(updateQuery, (error, results, fields) => {
              if (error) reject(error);
              resolve(`Our agent ${agentId} will deliver item soon :)`);
            });
          } else {
            resolve(
              "Our delivery agents are busy, please wait for few moments !"
            );
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }
  public unAssignDeliveryAgent(orderId: number) {
    const query = `UPDATE ${TABLE.name} 
        SET ${TABLE.columns.AVAILABLE}=true, ${TABLE.columns.ORDER_ID}=0
        WHERE ${TABLE.columns.ORDER_ID}=${orderId}`;
    return new Promise<any>((resolve, reject) => {
      connection.query(query, (error, results, fields) => {
        if (error) reject(error);
        resolve("order status updated");
      });
    });
  }
}
