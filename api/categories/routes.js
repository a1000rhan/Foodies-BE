const express = require('express');

const {
  getRecpie,
  fetchRecpie,
 
} = require('./controllers');
// const upload = require('../../middleware/multer');

const router = express.Router();

router.param('Recpie', async (req, res, next, Recpie) => {
    const recpie = await fetchRecpie(Recpie, next);
    if (recpie) {
      req.recpie = recpie;
      next();
    } else {
      const err = new Error('Recpie Not Found');
      err.status = 404;
      next(err);
    }
  });

  router.get('/', getRecpie);

  module.exports = router;