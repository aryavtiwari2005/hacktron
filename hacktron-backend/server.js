const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const bodyParser = require("body-parser")
const cors = require("cors")
const cookieParser = require('cookie-parser')
const app = express()
const productRoute = require('./routes/productRoutes')
const userRoute = require('./routes/userRoutes')
const PORT = process.env.PORT || 5000
const mongo_uri = process.env.MONGO_URI

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
    cors({
        origin: ["http://localhost:3000", "https://pinvent-app.vercel.app"],
        credentials: true,
    })
)

//Routes
app.use("/api/products", productRoute);
app.use("/api/users", userRoute)
app.get('/', (req, res) => {
    res.send('Backend home :)')
})

// Connect to DB and start server
mongoose
    .connect(mongo_uri)
    .then(() => {
        console.log("Database successfully connected")
        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`)
        })
    })
    .catch(err => console.log(err))