const Categories = require("../../db/models/Categories")

exports.fetchRecpie = async (req, res, next) => {
    try {
      const recpie = await Recpie.find().populate("recpie", "title");
      res.json(recpie)
    } catch (error) {
      next(error);
    }
  };

  exports.getRecpie = async (req, res) => {
    try {
      const recipie = await Recpie.find();
      return res.json(recipie);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  exports.racpieCreate = async (req, res, next) => {
    try {
    
      const newRecpie = await Recpie.create(req.body);
      return res.status(201).json(newRecpie);
    } catch (error) {
      next(error);
    }
  };
  
  