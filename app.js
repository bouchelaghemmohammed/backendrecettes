import 'dotenv/config';
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import userRoutes from "./routes/userRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

import sequelize from "./config/database.js";
import User from "./models/user.js";
import Recipe from "./models/recipe.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/recipes", recipeRoutes);

app.get("/", (req, res) => res.json({ message: "Recipes API (backend)" }));

// Centralized error handler (after routes)
app.use(errorHandler);

// Associations (definer une fois)
User.hasMany(Recipe, { foreignKey: "userId", as: "recipes" });
Recipe.belongsTo(User, { foreignKey: "userId", as: "user" });

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start application:", err);
    process.exit(1);
  }
}

start();

export default app;