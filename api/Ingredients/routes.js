const express = require("express");
const routers = express.Router();

const {
  getIngredient,
  deleteIngredient,
  updateIngredient,
  fetchIngredients,
} = require("./controller");
const { addIngredient } = require("./controllers");

routers.param("ingredientId", async (req, res, next, id) => {
  const ingredient = await fetchIngredients(id, next);
  if (ingredient) {
    req.ingredient = ingredient;
    next();
  } else {
    next({ status: 404, message: "Ingredient not found" });
  }
});

routers.get("/", getIngredient);
//return one product based on id #
routers.post("/",addIngredient)


routers.delete("/:ingredientId", deleteIngredient);
routers.put("/:ingredientId", updateIngredient);
module.exports = routers;