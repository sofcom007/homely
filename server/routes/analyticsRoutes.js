const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
//model
const visitModel = require('../models/visit.model.js')
const analyticsPath = path.join(__dirname, '../data', 'analytics.json')
//data
let analytics


router.get('/read-data', async (req, res) => {
    try {
        if(fs.existsSync(analyticsPath))
            analytics = JSON.parse(fs.readFileSync(analyticsPath, 'utf-8'))  
        res.status(200).json(analytics)
    } catch (error) {
        console.error("Error reading analytics data:", error)
        res.status(500).json({ error: "Error: Couldn't read analytics data" })
    }
})


module.exports = router