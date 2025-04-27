const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')


//setting up
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
//app.use(express.static(path.join(__dirname, '../client/dist')))
//app.use(express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


//cors setup
const corsOptions = {
    origin: ["http://localhost:5050"]
}
app.use(cors(corsOptions))
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
const projectRouter = require("./routes/projectRoutes.js")
const articleRouter = require("./routes/articleRoutes.js")
const awardRouter = require("./routes/awardRoutes.js")
const staffRouter = require("./routes/staffRoutes.js")
app.use("/projects", projectRouter)
app.use("/articles", articleRouter)
app.use("/awards", awardRouter)
app.use("/staff", staffRouter)