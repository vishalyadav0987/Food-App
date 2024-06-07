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
    
}

//FETCH USER CART DATA
const getCartData = async (req, res) => {

}

module.exports = {
    addToCart,
    removeFromCart,
    getCartData
}