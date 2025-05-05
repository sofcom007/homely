const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const bcrypt = require('bcrypt')
const validator = require('validator')
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

router.get('/read-users', async (req, res) => {
    try {
        const users = await userModel.find({})
        if(!users)
            return res.json(400).json({ message: 'Users not found' })

        res.status(200).json(users)
    } catch (error) {
        console.error('Error reading users: ', error)
        res.status(500).json({ error: 'Error reading users' })
    }
})
router.post('/create-user', uploadPictures.single('picture'), async (req, res) => {
    try {
        const { firstName, lastName, permission, username, email, phone, password } = req.body
        if(!firstName || !lastName || !permission || !username || !email || !password)
            return res.status(200).json({ message: 'All fields except picture and phone are necessary' })
        if(!validator.isEmail(email))
            return res.status(200).json({ message: 'Email format invalid' })

        const picture = req.file? req.file.filename : ''

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            firstName,
            lastName,
            permission,
            username,
            picture,
            email,
            phone,
            password: hashedPassword
        })
        await newUser.save()

        res.status(200).json({ message: 'User created successfully' })
    } catch (error) {
        console.error('Error creating user: ', error)
        res.status(500).json({ error: 'Error creating user' })
    }
})
router.put('/update-user/:id', uploadPictures.single('picture'), async (req, res) => {
    try {
        const { id } = req.params
        const { firstName, lastName, permission, username, email, phone, password } = req.body

        const user = await userModel.findById(id)
        if(!user)
            return res.status(400).json({ message: 'User not found' })

        //get new variables
        const newFirstName = firstName? firstName : user.firstName
        const newLastName = lastName? lastName: user.lastName
        const newPermission = permission? permission : user.permission
        const newUsername = username? username : user.username
        const newEmail = email? email : user.email
        const newPhone = phone? phone : user.phone
        const newPicture = req.file? req.file.filename : user.picture
        let newPassword = user.password
        //get password
        if(password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt)
            newPassword = hashedPassword
        }

        //delete old picture if new one provided
        if(req.file && user.picture) {
            const picturePath = path.join(__dirname, '../uploads', path.basename(user.picture))
            if(fs.existsSync(picturePath))
                fs.unlinkSync(picturePath)
        }

        //update user record
        user.firstName = newFirstName
        user.lastName = newLastName
        user.permission = newPermission
        user.username = newUsername
        user.email = newEmail
        user.phone = newPhone
        user.picture = newPicture
        user.password = newPassword
        await user.save()

        res.status(200).json({ message: 'User updated successfully' })

    } catch (error) {
        console.error('Error creating user: ', error)
        res.status(500).json({ error: 'Error creating user' })
    }
})
router.delete('/delete-user-picture/:id', async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)

        //find user
        const user = await userModel.findById(id)
        if(!user)
            return res.status(400).json({ message: 'User not found' })
        if(!user.picture)
            return res.status(400).json({ message: 'User has no associated picture' })

        //delete file
        const picturePath = path.join(__dirname, '../uploads', path.basename(user.picture))
        if(fs.existsSync(picturePath))
            fs.unlinkSync(picturePath)
        else {
            user.picture = ""
            await user.save()
            return res.status(200).json({ message: 'File not found. User picture set to none' })                        
        }

        //remove picture from record
        user.picture = ""
        await user.save()
        
        res.status(200).json({ message: 'User picture deleted successfully' })
    } catch (error) {
        console.error('Error deleting user picture: ', error)
        res.status(500).json({ error: 'Error deleting user picture' })
    }
})
router.delete('/delete-user/:id', async (req, res) => {
    try { 
        const { id } = req.params
        const user = await userModel.findById(id)

        if(user.picture){
            const picturePath = path.join(__dirname, '../uploads', path.basename(user.picture))
            if(fs.existsSync(picturePath))
                fs.unlinkSync(picturePath)
        }

        await userModel.findByIdAndDelete(id)

        res.status(200).json({ message: "User deleted successfully" })
    } catch (error) {
        console.error('Error deleting user picture: ', error)
        res.status(500).json({ error: 'Error deleting user picture' })
    }
})
router.delete('/delete-all-users', async (req, res) => {
    try {
        const users = await userModel.find({})
        users.forEach(user => {
            if(user.picture) {
                const picturePath = path.join(__dirname, '../uploads', path.basename(user.picture))
                if(fs.existsSync(picturePath))
                    fs.unlinkSync(picturePath)
            }
        });

        await userModel.deleteMany({})

        res.status(200).json({ message: 'Entire user base deleted successfully' })
    } catch (error) {
        console.error('Error deleting user picture: ', error)
        res.status(500).json({ error: 'Error deleting user picture' })
    }
})

module.exports = router