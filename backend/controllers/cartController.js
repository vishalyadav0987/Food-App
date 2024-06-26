const UserSchema = require('../modals/UserSchema');


// ADD ITEM TO USER CART
const addToCart = async (req, res) => {
    try {
        // Ye id protect route se liye gyi hai yani req.body.userId me dali gyi hai
        const { userId } = req.body;
        // console.log(userId);

        let userData = await UserSchema.findOne({ _id: userId });
        // console.log(userData);

        let cartData = await userData?.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        }
        else {
            cartData[req.body.itemId] += 1;
        }
        await UserSchema.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.log("Error in addToCart Function->", error);
        res.json({ success: false, message: error.message });
    }
}

//REMOVE ITEM TO USER CART
const removeFromCart = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await UserSchema.findOne({_id:userId});
        const cartData = await userData?.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }
        await UserSchema.findByIdAndUpdate(userId,{cartData});
        res.json({success:true,message:"Removed From Cart"});
    } catch (error) {
        console.log("Error in removeFromCart Function->", error);
        res.json({ success: false, message: error.message });
    }
}

//FETCH USER CART DATA
const getCartData = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await UserSchema.findOne({_id:userId});
        const cartData = await userData?.cartData;
        res.json({success:true,cartData});
    } catch (error) {
        console.log("Error in getCartData Function->", error);
        res.json({ success: false, message: error.message });
    }
}

module.exports = {
    addToCart,
    removeFromCart,
    getCartData
}