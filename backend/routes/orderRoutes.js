const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

// Get user orders
router.get('/', authMiddleware, orderController.getOrders);

// Place a new order
router.post('/', authMiddleware, orderController.createOrder);

module.exports = router;
