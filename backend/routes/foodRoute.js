const express = require('express');
const router = express.Router();
const { addNewFood } = require('../controllers/foodController');
const multer = require('multer');


router.post('/add',addNewFood);


module.exports = router;