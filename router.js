const express = require('express');
require('express-async-errors');

const router = express.Router();

router.use('/static', express.static(`${__dirname}/frontend/static/`));

router.get('/', require('./routers/home'));

router.get('/quick-search', require('./routers/quick-search'));

router.get('/category-tree', require('./routers/category-tree'));

router.get('/flush-category-tree-cache', require('./routers/flush-category-tree-cache'));

router.use((req, res, next) => {
  // Use it for error boundary
  next();
});

module.exports = router;
