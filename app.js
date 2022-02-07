const express = require("express");
const cors = require ('cors');
const connectDB = require("./db/database");
const userRoutes = require("./api/User/routes");
const recipesRoutes = require("./api/Recipes/routes");
const ingredientRoutes = require("./api/Ingredients/routes")
const app = express();
const passport = require("passport");
const {localStrategy, jwtStrategy} = require("./middleware/passport")


app.use(express.json());

connectDB();
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
