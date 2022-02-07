const express = require('express');

const {
  getCategory,
  fetchCategory,
  categoryCreate
 
} = require('./controllers');
// const upload = require('../../middleware/multer');

const routers = express.Router();

routers.param('categoryId', async (req, res, next, id) => {
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
  routers.post('/', categoryCreate);

  module.exports = routers;