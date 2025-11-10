import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import User from "../models/user.js";
import bcrypt from "bcryptjs";



const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";
const SALT_ROUNDS = 10;

/**
 * POST /api/auth/signup
 * body: { username, password }
 */
export const signup = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "username and password are required" });
    }

    // Check username est ce aue c'est unique
    const existingByUsername = await User.findOne({ where: { username } });
    if (existingByUsername) {
      return res.status(409).json({ message: "Username déja exist" });
    }

  
    // Hash password
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await User.create({
      username,
      password: hashed
    });

    const token = jwt.sign({ id: newUser.id, username: newUser.username }, JWT_SECRET, { expiresIn: "7d" });

    const safeUser = {
      id: newUser.id,
      username: newUser.username,
    };

    return res.status(201).json({ user: safeUser, token });
  } catch (err) {
   
    console.error("signup error:", err);
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "User already exists (unique constraint)" });
    }
    return next(err);
  }
};


export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if ((!username) || !password) {
      return res.status(400).json({ message: "username et password  sont requis" });
    }
  
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "Identifiants invalides" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Identifiants invalides" });

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "7d" });
    const safeUser = { id: user.id, username: user.username };
    return res.json({ user: safeUser, token });
  } catch (err) {
    return next(err);
  }
};