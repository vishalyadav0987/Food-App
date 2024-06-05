const express = require('express');
const router = express.Router();
const { addNewFood } = require('../controllers/foodController');
const multer = require('multer');

// IMAGE STORAGE ENGINE
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return (cb, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });


router.post('/add', upload.single("image"), addNewFood);


module.exports = router;