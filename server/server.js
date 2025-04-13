import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';


// recreate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//setting up
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


//cors setup
const corsOptions = {
    origin: ['https://localhost:5050']
}
app.use(cors(corsOptions))
console.log('Cors was setup successfully')


//server and db config
const mongoURI = process.env.MONGO_URI
const port = process.env.PORT || 6050
mongoose.connect(mongoURI).then(() => {
    app.listen(port, (err) => {
        if(err)
            return console.log(`ERROR! Couldn't connect to localhost:${port}`)
        return console.log(`Successfully connected to database and running on localhost:${port}`)
    })
})
.catch((err) => {console.log(`Connection to database failed. Error: ${err}`)})