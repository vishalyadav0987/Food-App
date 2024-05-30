const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

app.get('/test',(req,res)=>{
    res.send("Hi !! this is test route for testing purpose");
})

const PORT = 4000 || process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});
