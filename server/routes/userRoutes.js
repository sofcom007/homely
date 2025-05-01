const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
//multer setup
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        const fieldName = file.fieldname; // Get the field name
        const timestamp = Date.now(); // Current timestamp
        const ext = path.extname(file.originalname); // Get the file extension
        cb(null, `${fieldName}_${timestamp}${ext}`); // Set custom filename
    }
});
const uploadPictures = multer({ storage })
//model
const userModel = require('../models/user.model')

module.exports = router