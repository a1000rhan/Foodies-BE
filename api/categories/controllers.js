const Category = require("../../db/models/Categories");

exports.fetchCategory = async (CategoryId, req, res, next) => {
  try {
    const category = await Category.findById(CategoryId);
    res.json(category);
  } catch (error) {
    next(error);
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.find();
    return res.json(category);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.categoryCreate = async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body);

    return res.status(201).json(newCategory);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createRecipes = async (req, res, next) => {
  try {
    req.body.owner = req.user._id;

    const { catogeryId } = req.params;

    const newRecpie = await Recipes.create(req.body);

    await Recipes.findOneAndUpdate(
      { _id: catogeryId },
      { $push: { Recpie: newRecpie._id } }
    );
    return res.status(201).json(newRecpie);
  } catch (error) {
    next(error);
  }
};
