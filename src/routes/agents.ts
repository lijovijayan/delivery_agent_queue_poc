import express from "express";
import {
  getQueueDetails,
  assignOrderToDeliveryAgent,
  unassignOrderToDeliveryAgent,
  logAgentDetails,
} from "../controllers";

export const agents = express.Router();

agents.use((req, res, next) => {
  res.addListener("finish", () => {
    logAgentDetails();
  });
  next();
});

agents.get("/", (req, res) => {
  getQueueDetails(req, res);
});
agents.get("/assign/:orderId", (req, res) => {
  assignOrderToDeliveryAgent(req, res);
});
agents.get("/unassign/:orderId", (req, res) => {
  unassignOrderToDeliveryAgent(req, res);
});
