const express = require("express");
const upload = require("../middleware/multer");
const routers = express.Router();

const {
  getRecipes,
  getDetail,
  deleteRecipe,
  updateRecipe,
  fetchRecipes,
} = require("./controller");

routers.param("recipeId", async (req, res, next, id) => {
  const recipe = await fetchRecipes(id, next);
  if (recipe) {
    req.recipe = recipe;
    next();
  } else {
    next({ status: 404, message: "recipe not found" });
  }
});

routers.get("/", getRecipe);
//return one recipe based on id #
routers.get("/:recipeId", getDetail);

routers.delete("/:recipeId", deleteRecipe);
routers.put("/:recipeId", upload.single("image"), updateRecipe);
module.exports = routers;
