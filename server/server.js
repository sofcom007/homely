const express = require('express')
const session = require('express-session')
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')


//setting up
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
//setting up session
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60 * 1 //seconds(in 1 mnt) * minutes * hours
    }
}))


//cors setup
app.use(cors({
    credentials: true,
    origin: ["http://localhost:5050", "https://homely-architecture.onrender.com"]
}))
console.log('Cors was setup successfully')


//server and db config
const mongoURI = process.env.MONGO_URI
const port = process.env.PORT || 6050
mongoose.connect(mongoURI).then(() => {
    app.listen(port, (err) => {
        if(err)
            return console.log(`ERROR! Couldn't connect to http://localhost:${port}`)
        return console.log(`Successfully connected to database and running on http://localhost:${port}`)
    })
})
.catch((err) => {console.log(`Connection to database failed. Error: ${err}`)})


//routing
const publicRouter = require("./routes/publicRoutes.js")
const analyticsRouter = require("./routes/analyticsRoutes.js")
const projectRouter = require("./routes/projectRoutes.js")
const articleRouter = require("./routes/articleRoutes.js")
const awardRouter = require("./routes/awardRoutes.js")
const staffRouter = require("./routes/staffRoutes.js")
const userRouter = require("./routes/userRoutes.js")
app.use("/", publicRouter)
app.use("/analytics", analyticsRouter)
app.use("/projects", projectRouter)
app.use("/articles", articleRouter)
app.use("/awards", awardRouter)
app.use("/staff", staffRouter)
app.use("/users", userRouter)