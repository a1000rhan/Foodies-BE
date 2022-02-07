const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    title: {type :String, required:true},
    recipies:[{type: mongoose.Schema.Types.ObjectId, ref: "Recipe"}]
    
  });


module.exports = mongoose.model('Category', CategorySchema);
