const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const connectDB = require('./connectDB/connect');
const foodRoutes = require('./routes/foodRoute');;

app.use(express.json());
app.use(cors());


// API FOOD ROUTE ADD
app.use('/api/v1/food', foodRoutes);

app.get('/test', (req, res) => {
    res.send("Hi !! this is test route for testing purpose");
})

const PORT = 4000 || process.env.PORT;
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