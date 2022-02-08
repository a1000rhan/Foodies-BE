const Ingredient = require("../../db/models/Ingredient");

exports.fetchIngredient = async (ingredientId, next) => {
  try {
    const ingredient = await Ingredient.findById(ingredientId);
    return ingredient;
  } catch (err) {
    next(err);
  }
};

exports.deleteIngredient = async (req, res, next) => {
  try {
    await Ingredient.findByIdAndDelete({
      _id: req.ingredient.id,
    });

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

exports.getIngredient = async (req, res, next) => {
  try {
    //this mothed take only what inside the ""
    const ingredientArray = await Ingredient.find();

    res.json(ingredientArray);
  } catch (err) {
    next(err);
  }
};

exports.updateIngredient = async (req, res, next) => {
  try {
    const ingredient = await Ingredient.findByIdAndUpdate(
      { _id: req.ingredient.id },
      req.body,
      { new: true, runValidators: true }
    );
    console.log(
      "🚀 ~ file: controllers.js ~ line 42 ~ exports.updateProducts=async ~ ingredient",
      ingredient
    );
    res.json(ingredient);
  } catch (error) {
    next(error);
  }
};
