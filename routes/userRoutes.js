import express from "express";
import { signup, login } from "../controllers/userController.js";

const router = express.Router();

// NOTE: these routes are mounted in app.js at /api/auth
router.post("/login", login);
// POST /api/auth/signup
router.post("/signup", signup);
export default router;
