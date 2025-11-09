import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT || 3306,
  dialect: "mysql",
  logging: false,
  define: {
    underscored: false,
    freezeTableName: false
  }
});

export default sequelize;