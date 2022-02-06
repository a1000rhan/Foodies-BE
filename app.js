const express = require("express");
const recipeRouter = require("./Recipes/routes");
const connectDB = require("./db/database");
const app = express();

app.use(express.json());

app.use("/", recipeRouter);

connectDB();
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
