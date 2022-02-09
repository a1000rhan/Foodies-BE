const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const RecipeSchema = new mongoose.Schema({
  title: { type: String, require: true },
  image: { type: String },
  description: { type: String },
  calorie: { type: Number },
  // category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" }],
  amount: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
RecipeSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=title%>" });
module.exports = mongoose.model("Recipe", RecipeSchema);
