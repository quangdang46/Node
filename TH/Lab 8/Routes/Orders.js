const express = require("express");
const verifyToken = require("../middlewares/verifytoken");
const Order = require("../models/Order");

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find().populate("list.product");

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", verifyToken, async (req, res) => {
  const { list, total } = req.body;

  try {
    const newOrder = new Order({
      list: list,
      total: total,
    });

    await newOrder.save();

    res.status(200).json({ message: "Order created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id).populate("list.product");

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { list, total } = req.body;

  try {
    const order = await Order.findById(id);

    order.list = list;
    order.total = total;

    await order.save();

    res.status(200).json({ message: "Order updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await Order.findByIdAndDelete(id);

    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
