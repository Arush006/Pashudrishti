import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create Connection Pool
// const pool = mysql.createPool({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || '',
//   database: process.env.DB_NAME || 'pashudrishti',
//   port: process.env.DB_PORT || 3306,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'pashudrishti',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
});

// Test Database Connection
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL Connected Successfully");
    connection.release();
  } catch (error) {
    console.error("❌ Database Connection Failed:", error.message);
  }
})();

// Get Manual Connection (for transactions if needed)
export const getConnection = async () => {
  return await pool.getConnection();
};

// Simple Query Executor
export const executeQuery = async (query, params = []) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(query, params);
    return rows;
  } catch (error) {
    console.error("Query Error:", error.message);
    throw error;
  } finally {
    connection.release();
  }
};

export default pool;