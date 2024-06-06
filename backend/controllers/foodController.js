const FoodSchema = require('../modals/FoodSchema');


// ADD NEW FOOD
const addNewFood = async (req,res) => {
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

module.exports = {
    addNewFood,
}