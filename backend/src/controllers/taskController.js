// Interface between routes and business logic — Interface Segregation Principle

import * as TaskService from "../services/taskService.js";

export const createTask = async (req, res) => {
  try {
    console.log("Request body received:", req.body);
    const { title, description, emoji } = req.body;

    // Validate required fields
    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    console.log("Creating task with:", { title, description, emoji });
    const task = await TaskService.addTask(title, description, emoji);
    console.log("Task created successfully:", task);
    res.status(201).json(task);
  } catch (err) {
    console.error("Error creating task:", err.message);
    console.error("Full error:", err);
    res.status(400).json({ error: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await TaskService.listRecentTasks();
    res.json(tasks);
  } catch (err) {
    console.error("Error getting tasks:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const markDone = async (req, res) => {
  try {
    const { id } = req.params;
    await TaskService.completeTask(id);
    res.json({ message: "Task marked as done" });
  } catch (err) {
    console.error("Error marking task as done:", err.message);
    res.status(400).json({ error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, emoji } = req.body;
    const task = await TaskService.editTask(id, title, description, emoji);
    res.json(task);
  } catch (err) {
    console.error("Error updating task:", err.message);
    res.status(400).json({ error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await TaskService.removeTask(id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err.message);
    res.status(400).json({ error: err.message });
  }
};
