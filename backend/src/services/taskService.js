// Business logic layer — Open/Closed Principle: can extend without modifying

// PORT=4000
// DB_HOST=localhost
// DB_USER=root
// DB_PASSWORD=
// DB_NAME=todo_db

// REACT_APP_API_BASE_URL=http://localhost:4000/api


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
