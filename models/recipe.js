// backend/models/recipe.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

// Modèle Recipe : NE PAS importer User et NE PAS définir d'associations ici
const Recipe = sequelize.define(
  "Recipe",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  },
  {
    tableName: "recipes",
    timestamps: true
  }
);

export default Recipe;