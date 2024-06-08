const express = require('express');
const router = express.Router();
const protectedRouteMiddleware = require('../middlewares/protectedRoute')
const { placeOrder,verifyOrder } = require('../controllers/orderController');


router.post('/place',protectedRouteMiddleware,placeOrder);
router.post('/verify',verifyOrder)


module.exports = router;
