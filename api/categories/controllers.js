const Category = require("../../db/models/Categories");
const Recipe = require("../../db/models/Racpie");

exports.fetchCategory = async (categoryId, req, res, next) => {
  try {
    const category = await Category.findById(categoryId);
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
    req.body.owner = req.user;

    const { categoryId } = req.params;
    req.body.category = categoryId;
    const newRecpie = await Recipe.create(req.body);

    await Category.findOneAndUpdate(
      { _id: categoryId },
      { $push: { recipes: newRecpie._id } }
    );
    return res.status(201).json(newRecpie);
  } catch (error) {
    next(error);
  }
};
