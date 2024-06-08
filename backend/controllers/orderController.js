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
        await UserSchema.findByIdAndUpdate(userId,{cartData:{}});

        const line_items = items.map((item)=>({
            price_data:{
                currency:'inr',
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity
        }));
        line_items.push({
            price_data:{
                currency:'inr',
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:50*100
            },
            quantity:1
        });
        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });
        res.json({success:true,session_url:session.url})
    } catch (error) {
        console.log("Error in placeOrder Function->",error.message);
        res.json({success:false,message:error.message});  
    }
}

module.exports = {
    placeOrder,
}