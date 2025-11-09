import express from "express";
import {
  listRecipes,
  createRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe
} from "../controllers/recipeController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes (no auth required)
router.get("/", listRecipes);      // GET /api/recipes
router.get("/:id", getRecipe);    // GET /api/recipes/:id

// Protected routes
router.post("/", authMiddleware, createRecipe);     // POST /api/recipes
router.put("/:id", authMiddleware, updateRecipe);   // PUT /api/recipes/:id
router.delete("/:id", authMiddleware, deleteRecipe);// DELETE /api/recipes/:id

export default router;