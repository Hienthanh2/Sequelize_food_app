import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  dialect: process.env.DB_DIALECT,
  database: process.env.DB_DATABASE,
};

export default dbConfig;
