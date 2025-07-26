const express = require("express");
const router = express.Router();

let orders = []; // temporary in-memory storage

router.post("/", (req, res) => {
  const { items, total, userId } = req.body;
  const newOrder = {
    id: orders.length + 1,
    items,
    total,
    userId,
    date: new Date(),
    status: "pending"
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

router.get("/", (req, res) => {
  res.json(orders);
});

module.exports = router;
