const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const connectDB = require('./connectDB/connect');
const foodRoutes = require('./routes/foodRoute');
const userRoutes = require('./routes/userRoute');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use(express.json());
app.use(cors());


// API FOOD ROUTE ADD
app.use('/api/v1/food', foodRoutes);
app.use('/images', express.static('./uploads')); // SHOWING IMAGE ON LOCALHOST LINK [http://localhost:3000/images/17176555682191705388450800.jpg]
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/cart',cartRoutes);
app.use('/api/v1/order',orderRoutes);

app.get('/test', (req, res) => {
    res.send("Hi !! this is test route for testing purpose");
})

const PORT = 3000 || process.env.PORT;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);

        });
    } catch (error) {
        console.log("Database is not connected->", error);
    }
}
start();