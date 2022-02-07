const express = require("express");
<<<<<<< HEAD
const app = express()

app.listen(8080, () => 
  console.log("The application is running on localhost:8000"));

=======
const connectDB = require("./db/database");
const app = express();

app.use(express.json());

connectDB();
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
>>>>>>> 84a3bf16ca1a48bad7f9d68d3b1dc6f9551b99b5
