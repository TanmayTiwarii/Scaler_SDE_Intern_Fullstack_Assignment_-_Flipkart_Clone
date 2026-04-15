const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Get all products (with optional search and category filters)
router.get('/', productController.getProducts);

// Get single product by id
router.get('/:id', productController.getProductById);

module.exports = router;
