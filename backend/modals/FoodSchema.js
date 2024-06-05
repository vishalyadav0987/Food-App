const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
});
// if schema is already there so excute 1 eqn if not the 2 eqn
module.exports = mongoose.models.food || mongoose.model("food", FoodSchema);