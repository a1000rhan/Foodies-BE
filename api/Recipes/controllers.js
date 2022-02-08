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
    const recipeArray = await Recipes.find();

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

exports.createRecipes = async (req, res, next) => {
  try {
    req.body.owner = req.user._id;
    const newRecpie = await Recipes.create(req.body);
    console.log(
      "🚀 ~ file: controllers.js ~ line 42 ~ exports.updateProducts=async ~ Recipes",
      newRecpie
    );
    req.body.Ingredient.map(async(Ingredient));
    await Recipes.findOneAndUpdate(
      { _id: req.params.recipesId },
      { $push: { Ingredient: newIngredient._id } }
    );
    return res.status(201).json(newRecpie);
  } catch (error) {
    next(error);
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
