const express = require('express');
const router = express.Router();
const protectedRouteMiddleware = require('../middlewares/protectedRoute')
const { placeOrder,verifyOrder,userOrders } = require('../controllers/orderController');


router.post('/place',protectedRouteMiddleware,placeOrder);
router.post('/verify',verifyOrder);
router.post('/userorders',protectedRouteMiddleware,userOrders);


module.exports = router;
