const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')


//setting up
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../client/dist')));
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// For any route that isn't an API, serve the React app's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


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


//test api
app.get("/test-api", (req, res) => {
    res.status(200).json({ message: "API called successfully" })
    console.log("API called successfully")
})


//routing
const projectRouter = require("./routes/projectRoutes.js")
const articleRouter = require("./routes/articleRoutes.js")
const awardRouter = require("./routes/awardRoutes.js")
const staffRouter = require("./routes/staffRoutes.js")
app.use("/", projectRouter)
app.use("/", articleRouter)
app.use("/", awardRouter)
app.use("/", staffRouter)