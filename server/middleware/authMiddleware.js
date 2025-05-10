const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

async function checkAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization

    if (authHeader && authHeader.startsWith('Bearer')) {
        const token = authHeader.split(' ')[1]

        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await userModel.findById(decodedToken.id).select('-password')

            return next();
        } catch (error) {
            console.log("Error checking authentication:", error.message)
            return res.status(401).json({ message: 'Not authorized: invalid token' })
        }
    }

    // If no token or malformed header
    console.log("Not authorized: no token")
    return res.status(401).json({ message: 'Not authorized: no token' })
}

async function checkUnauthenticated(req, res, next) {
    const authHeader = req.headers.authorization

    if (authHeader && authHeader.startsWith('Bearer')){
        try {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, process.env.JWT_SECRET)
            return res.status(403).json({ message: "You're already authenticated" })
        } catch (error) {
            if (error.name === 'TokenExpiredError')
                return next()
            return res.status(400).json({ message: 'Invalid token' })
        }
    }

    return next()
}

module.exports = {checkAuthenticated, checkUnauthenticated}