// Business logic layer — Open/Closed Principle: can extend without modifying

import * as TaskModel from "../models/taskModel.js";

export const addTask = async (title, description) => {
  if (!title) throw new Error("Title is required");
  return await TaskModel.createTask(title, description);
};

export const listRecentTasks = async () => {
  return await TaskModel.getRecentTasks();
};

export const completeTask = async (id) => {
  if (!id) throw new Error("Invalid task ID");
  return await TaskModel.markTaskAsDone(id);
};
