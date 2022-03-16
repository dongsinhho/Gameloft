const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 4000
const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://sinhdeptrai:U4eGrPzORmZVDlZw@cluster0.m06ah.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const route = require("./route")

app.use(cors({
    "origin": true,
    "credentials": true
  }))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', route)
app.get('/', (req, res) => {
    res.json({message: 'Hello API server'})
})
app.get('*', (req, res) => {
    res.json({message: 'Nothing here'})
})

mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log('Database connection successful')
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch((err) => {
        console.log(`Database connection failed. Exiting now... \n ${err}`)
        process.exit()
    })

