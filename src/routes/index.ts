import express from "express";
import { agents } from "./agents";
import { orders } from "./orders";
export const routes = express.Router();

routes.use("/orders", orders);
routes.use("/agents", agents);
