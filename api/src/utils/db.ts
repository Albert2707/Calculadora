import { createPool } from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
export const pool = createPool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  port: 3306,
  password: process.env.PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
});
