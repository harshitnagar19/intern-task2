import mysql from "mysql2/promise";

import readAppConfig from "../utils/appConfigRead/appConfigRead.ts";

const fileData = readAppConfig();
const {db} = fileData;
const pool = mysql.createPool({
  host: db.host,
  user: db.user,
  password: db.password,
  database: db.database,
  waitForConnections: true,
  connectionLimit: db.connectionLimit ?? 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

const connectDB = async (): Promise<void> => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL database");
    connection.release();
  } catch (error: any) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

export { pool, connectDB };
