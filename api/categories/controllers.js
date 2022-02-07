const category = require("../../db/models/Categories")

exports.fetchCategory = async (req, res, next) => {
    try {
      const recpie = await Recpie.find().populate("recpie", "title");
      res.json(recpie)
    } catch (error) {
      next(error);
    }
  };

  exports.getCategory = async (req, res) => {
    try {
      const recipie = await Recpie.find();
      return res.json(recipie);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  exports.categoryCreate = async (req, res, next) => {
    try {
    
      const newRecpie = await Recpie.create(req.body);
      return res.status(201).json(newRecpie);
    } catch (error) {
      next(error);
    }
  };
  
  