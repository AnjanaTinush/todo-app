// Business logic layer — Open/Closed Principle: can extend without modifying

import * as TaskModel from "../models/taskModel.js";

export const addTask = async (title, description, emoji) => {
  if (!title) throw new Error("Title is required");
  return await TaskModel.createTask(title, description, emoji);
};

export const listRecentTasks = async () => {
  return await TaskModel.getRecentTasks();
};

export const completeTask = async (id) => {
  if (!id) throw new Error("Invalid task ID");
  return await TaskModel.markTaskAsDone(id);
};

export const editTask = async (id, title, description, emoji) => {
  if (!id) throw new Error("Invalid task ID");
  if (!title) throw new Error("Title is required");
  return await TaskModel.updateTask(id, title, description, emoji);
};

export const removeTask = async (id) => {
  if (!id) throw new Error("Invalid task ID");
  return await TaskModel.deleteTask(id);
};
