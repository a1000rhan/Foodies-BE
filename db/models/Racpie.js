const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const RecipeSchema = new mongoose.Schema({
  title: { type: String, require: true },
  image: { type: String },
  description: { type: String },
  calorie: { type: Number },
  catogire: { type: Number, min: 1, default: 1 },
});
RecipeSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
module.exports = mongoose.model("Recipe", RecipeSchema);
