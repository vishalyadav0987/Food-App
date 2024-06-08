const UserSchema = require('../modals/UserSchema');
const OrderSchema = require('../modals/OrderSchema');
const Stripe = require('stripe');


const stripe = new Stripe(process.env.STRIPE_SECERET_KEY);

// PLACING USER ORDER FROM FRONTEND
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173"
    const { userId, items, amount, address } = req.body;
    try {
        const newOrder = new OrderSchema({
            userId,
            items,
            amount,
            address,
        });
        await newOrder.save();
        await UserSchema.findByIdAndUpdate(userId, { cartData: {} });

        const line_items = items.map((item) => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));
        line_items.push({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 50 * 100
            },
            quantity: 1
        });
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });
        res.json({ success: true, session_url: session.url })
    } catch (error) {
        console.log("Error in placeOrder Function->", error.message);
        res.json({ success: false, message: error.message });
    }
}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == "true") {
            await OrderSchema.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Payment succesfully paid!" });
        }
        else {
            await OrderSchema.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment failed!" });
        }
    } catch (error) {
        console.log("Error in verifyOrder Function->", error.message);
        res.json({ success: false, message: error.message });
    }
}

const userOrders = async (req, res) => {
    const { userId } = req.body;
    
    // Input validation
    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
    }
    
    console.log(`Fetching orders for user ID: ${userId}`);
    try {
        const userOrder = await OrderSchema.find({ userId });
        if (!userOrder.length) {
            return res.status(404).json({ success: false, message: "No orders found for this user" });
        }
        res.status(200).json({ success: true, data: userOrder });
    } catch (error) {
        console.error("Error in userOrders function:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// FETCH OR GET ALL ORDER FOR ADMIN PANEL
const getAllOrderForAdmin = async(req,res)=>{
    try {
        const userOrder = await OrderSchema.find({});
        if (!userOrder.length) {
            return res.status(404).json({ success: false, message: "No orders found for this user" });
        }
        res.status(200).json({ success: true, data: userOrder });
    } catch (error) {
        console.error("Error in userOrders function:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = userOrders;

module.exports = {
    placeOrder,
    verifyOrder,
    userOrders,
    getAllOrderForAdmin,
}