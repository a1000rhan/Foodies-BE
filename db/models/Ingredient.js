const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const IngredientSchema = new mongoose.Schema({
  name: { type: String, require: true },
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
});

IngredientSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
module.exports = mongoose.model("Ingredient", IngredientSchema);
