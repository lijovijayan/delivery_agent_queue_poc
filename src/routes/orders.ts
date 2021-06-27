import express from "express";
export const orders = express.Router();

orders.get("/", (req, res) => {
  res.send("on orders");
});
