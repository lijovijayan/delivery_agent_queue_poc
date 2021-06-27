import { Agent } from "../services/delivery.queue.service";
import { IAgent } from "../types/agent";

const agent = new Agent();

export function newOrder(req: any, res: any) {
  const orderId: number = req.params.orderId;
  agent
    .assignDeliveryAgent(orderId)
    .then((agents: IAgent[]) => {
      res.json(agents);
    })
    .catch((err) => {
      res.json(err);
    });
}

export function updateDeliveryStatus(req: any, res: any) {
  const orderId: number = req.params.orderId;
  agent
    .assignDeliveryAgent(orderId)
    .then((agents: IAgent[]) => {
      res.json(agents);
    })
    .catch((err) => {
      res.json(err);
    });
}
