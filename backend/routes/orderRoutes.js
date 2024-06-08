const express = require('express');
const router = express.Router();
const protectedRouteMiddleware = require('../middlewares/protectedRoute')
const { placeOrder } = require('../controllers/orderController');


router.post('/place',protectedRouteMiddleware,placeOrder);


module.exports = router;
