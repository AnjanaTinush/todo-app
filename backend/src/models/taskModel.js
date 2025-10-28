// Responsible only for data operations — Single Responsibility Principle

import pool from "../config/db.js";

export const createTask = async (title, description) => {
  const [result] = await pool.query(
    "INSERT INTO task (title, description) VALUES (?, ?)",
    [title, description]
  );
  return { id: result.insertId, title, description, completed: false };
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

export const initTable = async () => {
  const conn = await pool.getConnection();
  await conn.query(`
    CREATE TABLE IF NOT EXISTS task (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  conn.release();
};
