import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST ,
  port: process.env.DB_PORT || 3307,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_NAME,
});

// ✅ Test connection when app starts
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ Connected to MySQL database successfully!");
    conn.release();
  } catch (error) {
    console.error("❌ Failed to connect to MySQL database:", error.message);
    process.exit(1); // Stop the app if DB fails to connect
  }
})();

export default pool;
