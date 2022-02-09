const express = require("express");
const cors = require("cors");
const connectDB = require("./db/database");
const userRoutes = require("./api/User/routes");
const recipesRoutes = require("./api/Recipes/routes");
const ingredientRoutes = require("./api/Ingredients/routes");
const categoryRoutes = require("./api/categories/routes");
const app = express();
const path = require("path");
const passport = require("passport");
const { localStartegy, jwtStrategy } = require("./middleware/passport");

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
});

app.use(passport.initialize());
passport.use(localStartegy);
passport.use(jwtStrategy);

//Routes
app.use("/api", userRoutes);
app.use("/api/ingredient", ingredientRoutes);
app.use("/api/recipes", recipesRoutes);
app.use("/api/category", categoryRoutes);

app.use("/media", express.static(path.join(__dirname, "media")));

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

connectDB();
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
