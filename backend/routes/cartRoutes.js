const express = require('express');
const router = express.Router();
const { addToCart, removeFromCart, getCartData } = require('../controllers/cartController')
const protectedRouteMiddleware = require('../middlewares/protectedRoute');protectedRouteMiddleware,


router.post('/add',protectedRouteMiddleware,addToCart);
router.post('/remove',protectedRouteMiddleware,removeFromCart);
router.post('/get',protectedRouteMiddleware,getCartData);

module.exports = router;