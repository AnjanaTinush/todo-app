// Interface between routes and business logic — Interface Segregation Principle

import * as TaskService from "../services/taskService.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, emoji } = req.body;
    const task = await TaskService.addTask(title, description, emoji);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await TaskService.listRecentTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const markDone = async (req, res) => {
  try {
    const { id } = req.params;
    await TaskService.completeTask(id);
    res.json({ message: "Task marked as done" });
  } catch (err) {
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
    res.status(400).json({ error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await TaskService.removeTask(id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
