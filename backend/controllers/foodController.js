const FoodSchema = require('../modals/FoodSchema');


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
        res.json({ success: true, data: foods,message:"Food is Fetch Succesfully" });
    } catch (error) {
        console.log("Error in getAllFoods Function: ", error);
        res.json({ success: false, message: "Food is not Fetch", error });
    }
}

module.exports = {
    addNewFood,
    getAllFoods,
}