const FoodSchema = require('../modals/FoodSchema');
const fs = require('fs');

// ADD NEW FOOD
const addNewFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const { name, description, price, category } = req.body;
    const newData = new FoodSchema({
        name,
        description,
        price,
        category,
        image: image_filename,
    });
    try {
        await newData.save();
        res.json({ success: true, message: "Food Added Successfully!", newData });
    } catch (error) {
        console.log("Error in addNewFood Function: ", error);
        res.json({ success: false, message: "Food is not added", error });
    }
}

// GET ALL FOOD OR LOST OF FOODS
const getAllFoods = async (req, res) => {
    try {
        const foods = await FoodSchema.find({});
        res.json({ success: true, data: foods, message: "Food is Fetch Succesfully" });
    } catch (error) {
        console.log("Error in getAllFoods Function: ", error);
        res.json({ success: false, message: "Food is not Fetch", error });
    }
}


// REMOVE FOOD ITEM
const removeFood = async (req, res) => {
    try {
        // THIS ID FROM POST REQUEST // NOT FROM DELETE REQUEST
        const { id } = req.body;
        const food = await FoodSchema.findById(id);
        console.log(food);
        fs.unlink(`uploads/${food.image}`, () => { });
        await FoodSchema.findByIdAndDelete(id);
        res.json({ success: true, message: "Food is succesfully removed" });
    } catch (error) {
        console.log("Error in removeFood Function: ", error);
        res.json({ success: false, message: "Food is not removed", error });
    }
}

module.exports = {
    addNewFood,
    getAllFoods,
    removeFood,
}