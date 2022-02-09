const Recipes = require("../../db/models/Racpie");

const Ingredient = require("../../db/models/Ingredient");

const Category = require("../../db/models/Categories");

exports.fetchRecipe = async (recipesId, next) => {
  try {
    const recipe = await Recipes.findById(recipesId);
    return recipe;
  } catch (err) {
    next(err);
  }
};

exports.getRecipes = async (req, res, next) => {
  try {
    //this mothed take only what inside the "
    const recipeArray = await Recipes.find().populate("owner");

    res.json(recipeArray);
  } catch (err) {
    next(err);
  }
};

exports.getDetail = async (req, res, next) => {
  try {
    const oneRecipe = await Recipes.findById({ _id: req.recipe._id }).populate(
      "owner"
    );
    // const oneProduct = products.find((e) => e.id === +id);
    res.json(oneRecipe);
  } catch (err) {
    next(err);
  }
};

exports.deleteRecipe = async (req, res, next) => {
  try {
    await Recipes.findByIdAndDelete({
      _id: req.recipe.id,
    });

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

exports.addIngredient = async (req, res, next) => {
  try {
    const newIngredient = await Ingredient.create(req.body);
    console.log(
      "🚀 ~ file: controllers.js ~ line 50 ~ exports.addIngredient= ~ newIngredient",
      newIngredient
    );

    return res.status(201).json(newIngredient);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.updateRecipe = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    }
    console.log(req.body); //new:true to to show the update after change immiditly
    const recipe = await Recipes.findByIdAndUpdate(
      { _id: req.recipe.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json(recipe);
  } catch (err) {
    next(err);
  }
};
