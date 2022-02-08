const express = require("express");
const routers = express.Router();
const upload = require("../../middleware/multer");

const passport = require("passport");

const {
  getCategory,
  fetchCategory,
  categoryCreate,
  createRecipes,
} = require("./controllers");
// const upload = require('../../middleware/multer');

routers.param("categoryId", async (req, res, next, id) => {
  const Category = await fetchCategory(id, next);
  if (Category) {
    req.Category = Category;
    next();
  } else {
    const err = new Error("Category Not Found");
    err.status = 404;
    next(err);
  }
});

routers.get("/", getCategory);
routers.post("/", categoryCreate);
routers.post(
  "/:catogoryId/recipies",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createRecipes
);

module.exports = routers;
