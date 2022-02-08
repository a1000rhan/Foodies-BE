const Category = require("../../db/models/Categories")

exports.fetchCategory = async (req, res, next) => {
    try {
      const category = await Category.findById(CategoryId);
      res.json(category)
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
      next(error);
    }
  };
  
  