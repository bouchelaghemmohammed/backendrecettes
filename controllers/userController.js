import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import User from "../models/user.js";
import bcrypt from "bcryptjs";



const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";
const SALT_ROUNDS = 10;

/**
 * POST /api/auth/signup
 * body: { username, email?, password }
 */
export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "username and password are required" });
    }

    // Check username uniqueness
    const existingByUsername = await User.findOne({ where: { username } });
    if (existingByUsername) {
      return res.status(409).json({ message: "Username already taken" });
    }

    // If email provided, check email uniqueness
    if (email) {
      const existingByEmail = await User.findOne({ where: { email } });
      if (existingByEmail) {
        return res.status(409).json({ message: "Email already taken" });
      }
    }

    // Hash password
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await User.create({
      username,
      email: email || null,
      password: hashed
    });

    const token = jwt.sign({ id: newUser.id, username: newUser.username }, JWT_SECRET, { expiresIn: "7d" });

    const safeUser = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email
    };

    return res.status(201).json({ user: safeUser, token });
  } catch (err) {
    // If DB unique constraint still triggers, return friendly message
    // eslint-disable-next-line no-console
    console.error("signup error:", err);
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "User already exists (unique constraint)" });
    }
    return next(err);
  }
};

/**
 * POST /api/auth/login
 * body: { username, password } or { email, password }
 */
export const login = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if ((!username && !email) || !password) {
      return res.status(400).json({ message: "username/email and password are required" });
    }

    const where = username ? { username } : { email };
    const user = await User.findOne({ where });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "7d" });
    const safeUser = { id: user.id, username: user.username, email: user.email };
    return res.json({ user: safeUser, token });
  } catch (err) {
    return next(err);
  }
};