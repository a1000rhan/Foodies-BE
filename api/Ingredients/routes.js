const express = require("express");
const routers = express.Router();

const { getIngredient, addIngredient } = require("./controllers");

routers.get("/", getIngredient);
routers.post("/", addIngredient);
//return one product based on id #

// routers.delete("/:ingredientId", deleteIngredient);
// routers.put("/:ingredientId", updateIngredient);
module.exports = routers;
