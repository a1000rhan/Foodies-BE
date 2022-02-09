const express = require("express");
const upload = require("../../middleware/multer");
const routers = express.Router();
const passport = require("passport");

const {
  getRecipes,
  getDetail,
  deleteRecipe,
  updateRecipe,
  fetchRecipe,

  createRecipes,
} = require("./controllers");

routers.param("recipesId", async (req, res, next, id) => {
  const recipe = await fetchRecipe(id, next);
  if (recipe) {
    req.recipe = recipe;
    next();
  } else {
    next({ status: 404, message: "recipes not found" });
  }
});

routers.get("/", getRecipes);
//return one recipe based on id #
routers.get("/:recipesId", getDetail);
routers.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createRecipes
);

routers.delete("/:recipesId", deleteRecipe);
routers.put("/:recipesId", upload.single("image"), updateRecipe);
module.exports = routers;
