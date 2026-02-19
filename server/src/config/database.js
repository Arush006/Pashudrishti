import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'pashudrishti',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const getConnection = () => {
  return pool.getConnection();
};

export const executeQuery = async (query, values = []) => {
  const connection = await getConnection();
  try {
    const [results] = await connection.execute(query, values);
    return results;
  } finally {
    connection.release();
  }
};

export default pool;
