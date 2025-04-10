import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 8080
const app = express()
app.listen(port, (err) => {
    if(err)
        console.log(`couldn't connect to https://localhost:${port}`)
    else{
        console.log(`Succcessfully connected to https://localhost:${port}`)
    }
})