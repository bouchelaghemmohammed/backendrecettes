// backend/models/user.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

// Modèle User : ne définit PAS d'associations ici
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: "users",
    timestamps: true
  }
);

export default User;