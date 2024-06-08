const express = require('express');
const router = express.Router();
const protectedRouteMiddleware = require('../middlewares/protectedRoute')
const { placeOrder,
    verifyOrder,
    userOrders,
    getAllOrderForAdmin
} = require('../controllers/orderController');


router.post('/place', protectedRouteMiddleware, placeOrder);
router.post('/verify', verifyOrder);
router.post('/userorders', protectedRouteMiddleware, userOrders);
router.get('/list', getAllOrderForAdmin);


module.exports = router;
