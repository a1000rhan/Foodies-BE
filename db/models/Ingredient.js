const mongoose = require("mongoose");


const IngredientSchema = new mongoose.Schema({
  name: { type: String, require: true },
  type: { type: String },

});

module.exports = mongoose.model("Ingredient", IngredientSchema);
