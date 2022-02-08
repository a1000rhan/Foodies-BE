const Category = require("../../db/models/Categories")



exports.fetchCategory = async (CategoryId,req, res, next) => {
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


  
  
  