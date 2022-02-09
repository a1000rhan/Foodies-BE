const express = require("express");
const routers = express.Router();

const { getCategory, fetchCategory, categoryCreate } = require("./controllers");
// const upload = require('../../middleware/multer');

routers.get("/", getCategory);
routers.post("/", categoryCreate);

module.exports = routers;
