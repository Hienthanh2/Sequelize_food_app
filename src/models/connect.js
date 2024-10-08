import { Sequelize } from "sequelize";
import dbConfig from "../config/connect_db.js";

const sequelize = new Sequelize({
  database: dbConfig.database,
  username: dbConfig.user,
  password: dbConfig.password,
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
});

export default sequelize;
