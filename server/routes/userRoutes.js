const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')
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
//auth middleware
const { checkAuthenticated, checkUnauthenticated } = require('../middleware/authMiddleware')


//CRUD routes
router.get('/read-users', checkAuthenticated, async (req, res) => {
    try {
        const users = await userModel.find({ _id: {$ne : req.user._id}})
        if(!users)
            return res.json(400).json({ message: 'Users not found' })
        res.status(200).json(users)
    } catch (error) {
        console.log('Error reading users: ', error)
        res.status(500).json({ error: 'Error reading users' })
    }
})
router.get('/read-user', checkAuthenticated, async (req, res) => {
    try {
        const id = req.user.id
        const user = await userModel.findById(id)
        return res.status(200).json(user)
    } catch (error) {
        console.log('Error reading single user: ', error)
        res.status(500).json({ error: 'Error reading single user' })
    }
})
router.post('/create-user', checkAuthenticated, uploadPictures.single('picture'), async (req, res) => {
    try {
        const { firstName, lastName, permission, username, email, phone, password } = req.body
        if(!firstName || !lastName || !permission || !username || !email || !password)
            return res.status(200).json({ message: 'All fields except picture and phone are necessary' })
        if(!validator.isEmail(email))
            return res.status(200).json({ message: 'Email format invalid' })

        const userExists = await userModel.findOne({ email })
        if(userExists)
            return res.status(300).json({ message: 'Email already in use' })

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
        console.log('Error creating user: ', error)
        res.status(500).json({ error: 'Error creating user' })
    }
})
router.put('/update-user/:id', checkAuthenticated, uploadPictures.single('picture'), async (req, res) => {
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
        console.log('Error creating user: ', error)
        res.status(500).json({ error: 'Error creating user' })
    }
})
router.delete('/delete-user-picture/:id', checkAuthenticated, async (req, res) => {
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
        console.log('Error deleting user picture: ', error)
        res.status(500).json({ error: 'Error deleting user picture' })
    }
})
router.delete('/delete-user/:id', checkAuthenticated, async (req, res) => {
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
        console.log('Error deleting user picture: ', error)
        res.status(500).json({ error: 'Error deleting user picture' })
    }
})
router.delete('/delete-all-users', checkAuthenticated, async (req, res) => {
    try {
        const users = await userModel.find({})
        users.forEach(user => {
            if(user.id != req.user.id  && user.picture) {
                const picturePath = path.join(__dirname, '../uploads', path.basename(user.picture))
                if(fs.existsSync(picturePath))
                    fs.unlinkSync(picturePath)
            }
        });

        await userModel.deleteMany({ _id : {$ne: req.user._id}})

        res.status(200).json({ message: 'Entire user base deleted successfully' })
    } catch (error) {
        console.log('Error deleting user picture: ', error)
        res.status(500).json({ error: 'Error deleting user picture' })
    }
})


//auth routes
router.get('/check-authenticated', checkAuthenticated, (req, res) => {
    res.status(200).json({ message: "User is authenticated" })
})
router.get('/check-authenticated', async (req, res) => {
    const authHeader = req.headers.authorization
  
    if (!authHeader || !authHeader.startsWith('Bearer '))
        return res.status(401).json({ message: "No token provided" })
  
    const token = authHeader.split(' ')[1]
    try {
        jwt.verify(token, process.env.JWT_SECRET)
        return res.status(200).json({ message: "Authenticated" })
    } catch (error) {
        if (error.name === 'TokenExpiredError')
            return res.status(401).json({ message: "Token expired" })
        return res.status(401).json({ message: "Invalid token" })
    }
}) 
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        if(!email || !password)
            return res.status(400).json({ message: "All fields are necessary" })

        const user = await userModel.findOne({ $or: [{email: email}, {username: email}] })

        if(!user)
            return res.status(400).json({ message: "Email or username unregistered" })

        const passwordMatch = await bcrypt.compare(password, user.password)

        if(!passwordMatch)
            return res.status(400).json({ message: "Password incorrect" })


        const token = generateJWT(user._id, user.permission)
        req.session.user = user
        res.status(200).json({ message: "Logged in successfully", token: token })

    } catch (error) {
        console.log("Error login in:", error)
        res.status(500).json({ error: "Error: couldn't log in" })
    }
})
router.delete('/logout', checkAuthenticated, async (req, res) => {
    try {
        req.user = null
        return res.status(200).json({ message: "Logout successful" })
    } catch (error) {
        console.log("Error logging out:", error)
        res.status(500).json({ error: "Error: Couldn't logout" })
    }
})


//jwt
function generateJWT (id, permission) {
    return jwt.sign({ id, permission }, process.env.JWT_SECRET, {
        expiresIn: '30m'
    })
}

module.exports = router