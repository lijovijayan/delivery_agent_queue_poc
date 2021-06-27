import { Agent } from "../services/delivery.queue.service";
const agent = new Agent();
export function getQueueDetails(req: any, res: any) {
  agent
    .getAllAgentDetails()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
}
export function logAgentDetails() {
  return new Promise((resolve, reject) => {
    agent
      .getAllAgentDetails()
      .then((data) => {
        console.table(data);
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function assignOrderToDeliveryAgent(req: any, res: any) {
  const orderId: number = req.params.orderId;
  agent
    .assignDeliveryAgent(orderId)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
}

export function unassignOrderToDeliveryAgent(req: any, res: any) {
  const orderId: number = req.params.orderId;
  agent
    .unAssignDeliveryAgent(orderId)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
}
