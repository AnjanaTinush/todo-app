// Responsible only for data operations — Single Responsibility Principle

import pool from "../config/db.js";

export const createTask = async (title, description, emoji) => {
  const [result] = await pool.query(
    "INSERT INTO task (title, description, emoji) VALUES (?, ?, ?)",
    [title, description, emoji]
  );
  return { id: result.insertId, title, description, emoji, completed: false };
};

export const getRecentTasks = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM task WHERE completed = false ORDER BY created_at DESC LIMIT 5"
  );
  return rows;
};

export const markTaskAsDone = async (id) => {
  await pool.query("UPDATE task SET completed = true WHERE id = ?", [id]);
  return { id };
};

export const updateTask = async (id, title, description, emoji) => {
  await pool.query(
    "UPDATE task SET title = ?, description = ?, emoji = ? WHERE id = ?",
    [title, description, emoji, id]
  );
  return { id, title, description, emoji };
};

export const deleteTask = async (id) => {
  await pool.query("DELETE FROM task WHERE id = ?", [id]);
  return { id };
};

export const initTable = async () => {
  const conn = await pool.getConnection();
  await conn.query(`
    CREATE TABLE IF NOT EXISTS task (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      emoji VARCHAR(10),
      completed BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  conn.release();
};
