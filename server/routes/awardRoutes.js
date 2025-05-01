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
const awardModel = require('../models/award.model')

router.get('/read-awards', async (req, res) => {
    try{
        const awards = await awardModel.find({})
        if(!awards)
            return res.status(400).json({ message: "No articles were found" })
        awards.sort((a,b) => new Date(b.date) - new Date(a.date))
        res.status(200).json(awards)
    } catch (error) {
        console.log("Error reading awards: ", error)
        res.status(500).json({ error: "Failed to read awards" })
    }
})
router.post('/create-award', uploadPictures.single('picture'), async (req, res) => {
    try{
        const { name, date, description } = req.body
        if(!name || !date)
            return res.status(400).json({ message: "Name and date are necessary" })

        const picture = req.file? req.file.filename : ""

        const newAward = new awardModel({
            name,
            date,
            picture,
            description
        })

        await newAward.save()

        res.status(200).json({ message: "Award created successfully" })
    } catch (error) {
        console.log("Error creating award: ", error)
        res.status(500).json({ error: "Failed to create award" })
    }
})
router.put('/update-award/:id', uploadPictures.single('picture'), async (req, res) => {
    try{
        const { id } = req.params
        const { name, date, description } = req.body

        const award = await awardModel.findById(id)

        if(!award)
            return res.status(400).json({ message: "Award not found" })

        //get new data
        const newName = name? name : award.name
        const newDate = date? date : award.date
        const newDes = description? description : award.description
        const newPicture = req.file? req.file.filename : award.picture

        //delete previous picture if need be
        if(req.file && award.picture){
            const picturePath = path.join(__dirname, '../uploads', path.basename(award.picture))
            if(fs.existsSync(picturePath))
                fs.unlinkSync(picturePath)
        }

        //pass new data to record
        award.name = newName
        award.date = newDate
        award.description = newDes
        award.picture = newPicture
        await award.save()

        //respond
        res.status(200).json({ message: "Award updated successfully" })
    } catch (error) {
        console.log("Error updating award: ", error)
        res.status(500).json({ error: "Failed to update award" })
    }
})
router.delete('/delete-award-picture/:id', async (req, res) => {
    try{
        const { id } = req.params

        //get the award
        const award = await awardModel.findById(id)
        if(!award)
            return res.status(400).json({ message: 'Award not found' })
        if(!award.picture)
            return res.status(200).json({ message: 'The award has no associated picture' })

        //delete the picture file
        const picturePath = path.join(__dirname, '../uploads', path.basename(award.picture))
        if(fs.existsSync(picturePath))
            fs.unlinkSync(picturePath)

        //remove the file from the record
        award.picture = ''
        await award.save()
        
        res.status(200).json({ message: 'Award picture deleted successfully' })
    } catch (error) {
        console.log("Error deleting award picture: ", error)
        res.status(500).json({ error: "Failed to delete award picture" })
    }
})
router.delete('/delete-award/:id', async (req, res) => {
    try{
        const { id } = req.params
        const award = await awardModel.findById(id)

        if(!award)
            return res.status(400).json({ message: "Award not found" })

        if(award.picture){
            const picturePath = path.join(__dirname, '../uploads', path.basename(award.picture))
            if(fs.existsSync(picturePath))
                fs.unlinkSync(picturePath)
        }

        await awardModel.findByIdAndDelete(id)

        res.status(200).json({ message: "Award deleted successfully" })
    } catch (error) {
        console.log("Error deleting award: ", error)
        res.status(500).json({ error: "Failed to delete award" })
    }
})
router.delete('/delete-all-awards', async (req, res) => {
    try{
        const awards = await awardModel.find({})
        if(!awards)
            return res.json({ message: "Awards not found" })

        awards.forEach(award => {
            if(award.picture){
                const picturePath = path.join(__dirname, '../uploads', path.basename(award.picture))
                if(fs.existsSync(picturePath))
                    fs.unlinkSync(picturePath)
            }
        })
        await awardModel.deleteMany({})
        
        res.status(200).json({ message: "All awards deleted successfully" })
    } catch (error) {
        console.log("Error deleting all awards: ", error)
        res.status(500).json({ error: "Failed to delete all awards" })
    }
})


module.exports = router