import mysql from "mysql";
import { DB } from "../constants";

export let connection = mysql.createConnection(DB);

export function initializeDB() {
  console.log(`connected with ${connection.config.database} DB`)
  try {
    connection.connect();
  } catch (err) {
    console.error(err);
  }
}
export function closeDBConnection() {
  connection.end();
}
