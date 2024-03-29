

const express = require('express');
const mongoose = require('mongoose');
const Review = require("../models/Review");

const routerVideo = express.Router();

// Create
routerVideo.post("/", async (req, res) => {
  try {
    const newCourse = await Review.create(req.body);
    return res.status(201).json(newCourse);
  } catch (error) {
    return res.status(500).json({ error: "Could not create course" });
  }
});

// Read all
routerVideo.get("/", async (req, res) => {
  try {
    const courses = await Review.find();
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ error: "Could not retrieve courses" });
  }
});

routerVideo.get("/course/:courseId", async (req, res) => {
  const { courseId } = req.params;

  try {
    const Review = await Review.find({ courseId });
    return res.status(200).json(Review);
  } catch (error) {
    return res.status(500).json({ error: "Could not retrieve Review" });
  }
});
// Read by ID
routerVideo.get("/:id", async (req, res) => {
  try {
    const course = await Review.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ error: "Could not retrieve course" });
  }
});

// Update
routerVideo.patch("/:id", async (req, res) => {
  try {
    const updatedCourse = await Review.findByIdAndUpdate(
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
routerVideo.delete("/:id", async (req, res) => {
  try {
    const deletedCourse = await Review.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ error: "Could not delete course" });
  }
});

module.exports = routerVideo;
