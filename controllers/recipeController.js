import Recipe from "../models/recipe.js";


 // Lister toutes les recettes (public)

export const listRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll({
      order: [["createdAt", "DESC"]]
    });
    return res.json(recipes);
  } catch (err) {
    return next(err);
  }
};


 // Créer une recette (protégé)

export const createRecipe = async (req, res, next) => {
  try {
    const { name, ingredients, instructions, category, imageUrl } = req.body;
    if (!name) return res.status(400).json({ message: "Recipe name is required" });
    if (!req.user || !req.user.id) return res.status(401).json({ message: "Authentication required" });

    const recipe = await Recipe.create({
      name,
      ingredients,
      instructions,
      category,
      imageUrl,
      userId: Number(req.user.id)
    });

    return res.status(201).json(recipe);
  } catch (err) {
    return next(err);
  }
};

/**
 * Get single recipe (public)
 */
export const getRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByPk(id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    return res.json(recipe);
  } catch (err) {
    return next(err);
  }
};

/**
 * Update recipe (protected, owner only)
 */
export const updateRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByPk(id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (!req.user || !req.user.id) return res.status(401).json({ message: "Authentication required" });

    const ownerId = Number(recipe.userId);
    const currentUserId = Number(req.user.id);
    if (ownerId !== currentUserId) return res.status(403).json({ message: "Forbidden: not the owner" });

    const { name, ingredients, instructions, category, imageUrl } = req.body;
    await recipe.update({ name, ingredients, instructions, category, imageUrl });
    return res.json(recipe);
  } catch (err) {
    return next(err);
  }
};

/**
 * Delete recipe (protected, owner only)
 */
export const deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByPk(id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (!req.user || !req.user.id) return res.status(401).json({ message: "Authentication required" });

    const ownerId = Number(recipe.userId);
    const currentUserId = Number(req.user.id);
    if (ownerId !== currentUserId) return res.status(403).json({ message: "Forbidden: not the owner" });

    await recipe.destroy();
    return res.json({ message: "Recipe deleted" });
  } catch (err) {
    return next(err);
  }
};