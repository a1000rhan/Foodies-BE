const Recipe = require("../db/models/Racpie");

exports.fetchRecipes = async (recipeId, next) => {
  try {
    const recipe = await Recipe.findById(recipeId);
    return recipe;
  } catch (err) {
    next(err);
  }
};

exports.getRecipes = async (req, res, next) => {
  try {
    //this mothed take only what inside the ""
    const recipeArray = await Recipe.find({});

    res.json(recipeArray);
  } catch (err) {
    next(err);
  }
};
exports.createRecpie = async (req, res, next) => {
  try {
    const newRecpie = await Recipe.create(req.body);

    return res.status(201).json(newRecpie);
  } catch (e) {
    next(e);
  }
};
exports.getDetail = async (req, res, next) => {
  try {
    const oneRecipe = await Recipe.findById({ _id: req.recipe.id });
    // const oneRecipe = recipes.find((e) => e.id === +id);
    res.json(oneRecipe);
  } catch (err) {
    next(err);
  }
};

exports.deleteRecipe = async (req, res, next) => {
  try {
    await Recipe.findByIdAndDelete({
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
    const recipe = await Recipe.findByIdAndUpdate(
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
