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
const staffModel = require('../models/staffMember.model')

router.get('/read-staff', async (req, res) => {
    try{
        const staff = await staffModel.find({})
        if(!staff)
            return res.status(400).json({ message: "Staff not found" })
        res.status(200).json(staff)
    } catch (error) {
        console.log("Error reading staff: ", error)
        res.status(500).json({ error: "Failed to read staff"})
    }
})
router.post('/create-staff', uploadPictures.single('picture'), async (req, res) => {
    try{
        const { firstName, lastName, position, description } = req.body
        if(!firstName || !lastName || !position)
            return res.status(400).json({ message: "All fields except picture and description are necessary" })

        const newPicture = req.file? req.file.filename : ""

        const newMember = new staffModel({
            firstName,
            lastName,
            position,
            picture: newPicture,
            description
        })

        await newMember.save()

        res.status(200).json({ message: "Staff member created successfully" })
    } catch (error) {
        console.log("Error creating staff member: ", error)
        res.status(500).json({ error: "Failed to create staff member"})
    }
})
router.put('/update-member/:id', uploadPictures.single('picture'), async (req, res) => {
    try{
        const { id } = req.params
        const { firstName, lastName, position, description } = req.body

        const member = await staffModel.findById(id)
        if(!member)
            return res.status(400).json({ message: "Member not found" })

        //get new info
        const newFirstName = firstName? firstName : member.firstName
        const newLastName = lastName? lastName : member.lastName
        const newPosition = position? position : member.position
        const newDescription = description
        const newPicture = req.file? req.file.filename : member.picture

        //delete old picture if new one provided
        if(req.file && member.picture){
            const picturePath = path.join(__dirname, '../uploads', path.basename(member.picture))
            if(fs.existsSync(picturePath))
                fs.unlinkSync(picturePath)
        }

        //pass new info to record and save
        member.firstName = newFirstName
        member.lastName = newLastName
        member.position = newPosition
        member.description = newDescription
        member.picture = newPicture
        await member.save()

        res.status(200).json({ message: "Staff member updated successfully" })
    } catch (error) {
        console.log("Error updating staff member: ", error)
        res.status(500).json({ error: "Failed to update staff member"})
    }
})
router.delete('/delete-member/:id', async (req, res) => {
    try{
        const { id } = req.params
        const member = await staffModel.findById(id)
        if(!member)
            return res.status(400).json({ message: "Staff member not found" })

        
        if(member.picture){
            const picturePath = path.join(__dirname, '../uploads', path.basename(member.picture))
            if(fs.existsSync(picturePath))
                fs.unlinkSync(picturePath)
        }

        await staffModel.findByIdAndDelete(id)

        res.status(200).json({ message: "Member deleted successfully" })
    } catch (error) {
        console.log("Error deleting staff member: ", error)
        res.status(500).json({ error: "Failed to delete staff member"})
    }
})
router.delete('/delete-staff', async (req, res) => {
    try{
        const staff = await staffModel.find({})

        if(!staff)
            res.status(400).json({ message: "Staff not found" })

        staff.forEach(member => {
            if(member.picture){
                const picturePath = path.join(__dirname, '../uploads', path.basename(member.picture))
                if(fs.existsSync(picturePath))
                    fs.unlinkSync(picturePath)
            }
        })

        await staffModel.deleteMany({})

        res.status(200).json({ message: "Entire staff deleted successfully" })
    } catch (error) {
        console.log("Error deleting entire staff: ", error)
        res.status(500).json({ error: "Failed to delete the entire staff"})
    }
})

module.exports = router