import { Sequelize } from "sequelize";

const host = process.env.DB_HOST || process.env.DATABASE_HOST || "localhost";
const port = Number(process.env.DB_PORT || process.env.DATABASE_PORT || 3306);
const database = process.env.DB_NAME || process.env.DATABASE_NAME || "recipes_db";
const username = process.env.DB_USER || process.env.DATABASE_USERNAME;
const password = process.env.DB_PASSWORD || process.env.DATABASE_PASSWORD ;

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect: "mysql",
  logging: false
});

export default sequelize;