

const express = require('express');
const mongoose = require('mongoose');
const Order = require("../models/Order");
const routerOrder = express.Router();

// Create
routerOrder.post("/", async (req, res) => {
  try {
    const newCourse = await Order.create(req.body);
    return res.status(201).json(newCourse);
  } catch (error) {
    return res.status(500).json({ error: "Could not create course" });
  }
});

// Read all
routerOrder.get("/", async (req, res) => {
  try {
    const allOrder = await Order.find();

    if (!allOrder || allOrder.length === 0) {
      return res.status(404).json({ error: "No Order found" });
    }

    const reversedOrder = allOrder.reverse();

    return res.status(200).json(reversedOrder);
  } catch (error) {
    if (error.name === "MongoError" && error.code === 18) {
      return res.status(500).json({ error: "Invalid parameter format" });
    }
    return res.status(500).json({ error: "Could not retrieve Order" });
  }
});


routerOrder.get("/:id", async (req, res) => {
  try {
    const course = await Order.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ error: "Could not retrieve course" });
  }
});
// Update Order status
routerOrder.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    // Update status for the order
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.status(200).json(updatedOrder);
  } catch (error) {
    return res.status(500).json({ error: "Could not update order" });
  }
});
// Update
routerOrder.put("/:id", async (req, res) => {
  try {
    const updatedCourse = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res.status(200).json(updatedCourse);
  } catch (error) {
    return res.status(500).json({ error: "Could not update course" });
  }
});

// Delete
routerOrder.delete("/:id", async (req, res) => {
  try {
    const deletedCourse = await Order.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ error: "Could not delete course" });
  }
});

module.exports = routerOrder;
