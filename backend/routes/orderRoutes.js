const express = require('express');
const router = express.Router();
const protectedRouteMiddleware = require('../middlewares/protectedRoute')
const { placeOrder,
    verifyOrder,
    userOrders,
    getAllOrderForAdmin,
    updateOrderStatus,
} = require('../controllers/orderController');


router.post('/place', protectedRouteMiddleware, placeOrder);
router.post('/verify', verifyOrder);
router.post('/userorders', protectedRouteMiddleware, userOrders);
router.get('/list', getAllOrderForAdmin);
router.post('/status', updateOrderStatus);


module.exports = router;
