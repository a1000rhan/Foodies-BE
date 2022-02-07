const Categories = require("../../db/models/Categories")

exports.fetchProduct = async (categoriesId, next) => {
    try {
      const categories = await Categories.findById(categoriesId);
      return categories;
    } catch (error) {
      next(error);
    }
  };
  