const express = require("express");
const connectDB = require("./db/database");
const app = express();

app.use(express.json());

connectDB();
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
