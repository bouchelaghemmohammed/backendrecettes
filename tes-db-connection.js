import dotenv from "dotenv";
dotenv.config();

import sequelize from "./config/database.js";

console.log("DEBUG env:", {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD_present: !!process.env.DB_PASSWORD, // true/false only, not the value
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✔︎ DB connection OK");
    process.exit(0);
  } catch (err) {
    console.error("✖︎ DB connection FAILED:", err.message);
    process.exit(1);
  }
})();