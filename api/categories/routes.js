const express = require('express');
const routers = express.Router();

const {
  getCategory,
  fetchCategory,
  categoryCreate,
 
 
} = require('./controllers');
// const upload = require('../../middleware/multer');

routers.param('CategoryId', async (req, res, next, id) => {
    const Category = await fetchCategory(id, next);
    if (Category) {
      req.Category = Category;
      next();
    } else {
      const err = new Error('Category Not Found');
      err.status = 404;
      next(err);
    }
  });

  routers.get("/", getCategory);

  
  module.exports = routers;