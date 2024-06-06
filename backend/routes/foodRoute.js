const express = require('express');
const router = express.Router();
const { addNewFood,
    getAllFoods,
} = require('../controllers/foodController');
const multer = require('multer');

// IMAGE STORAGE ENGINE
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });


router.post('/add', upload.single("image"), addNewFood);
router.get('/list', getAllFoods);


module.exports = router;