// Business logic layer — Open/Closed Principle: can extend without modifying

import * as TaskModel from "../models/taskModel.js";

export const addTask = async (title, description, emoji) => {
  console.log("Service addTask called with:", { title, description, emoji });
  if (!title) throw new Error("Title is required");
  try {
    const result = await TaskModel.createTask(title, description, emoji);
    console.log("Service addTask result:", result);
    return result;
  } catch (error) {
    console.error("Service addTask error:", error.message);
    throw error;
  }
};

export const listRecentTasks = async () => {
  console.log("Service listRecentTasks called");
  try {
    const tasks = await TaskModel.getRecentTasks();
    console.log("Service listRecentTasks result:", tasks);
    return tasks;
  } catch (error) {
    console.error("Service listRecentTasks error:", error.message);
    throw error;
  }
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
