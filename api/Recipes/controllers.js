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
<<<<<<< HEAD
    const recipeArray = await Recipes.find().populate("owner");
=======
    const recipeArray = await Recipes.find().populate("owner", "username");
>>>>>>> 6346248241e8b9f5b9dc0bc4dcac7c71f997c590

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

exports.createRecipes = async (req, res, next) => {
  try {
    req.body.owner = req.user;

    const newRecpie = await Recipes.create(req.body);

    req.body.ingredients.map(async (ingredient) => {
      await Category.findOneAndUpdate(
        { _id: ingredient },
        { $push: { recipes: newRecpie._id } }
      );
    });

    req.body.category.map(async (category) => {
      await Category.findOneAndUpdate(
        { _id: category },
        { $push: { recipes: newRecpie._id } }
      );
    });

    return res.status(201).json(newRecpie);
  } catch (error) {
    next(error);
  }
};
