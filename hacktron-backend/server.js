const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const bodyParser = require("body-parser")
const cors = require("cors")
const cookieParser = require('cookie-parser')
const app = express()
const { sendEmail } = require("./services/emailService")
const productRoute = require('./routes/productRoutes')
const userRoute = require('./routes/userRoutes')
const orderRoute = require('./routes/orderRoutes')
const Product = require("./models/productModel")
const Message = require("./models/messageModel")
const PORT = process.env.PORT || 5000
const mongo_uri = process.env.MONGO_URI

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    })
)

//Routes
app.use("/api/products", productRoute);
app.use("/api/users", userRoute)
app.use("/api/orders", orderRoute)

app.post('/api/messages', async (req, res) => {
    const { senderId, receiverId, senderName, recieverName, content } = req.body;
    const newMessage = new Message({ sender: senderId, receiver: receiverId, senderName: senderName, recieverName: recieverName, content });
    try {
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/api/messages/:userId1/:userId2', async (req, res) => {
    const { userId1, userId2 } = req.params;
    try {
        const messages = await Message.find({
            $or: [
                { sender: userId1, receiver: userId2 },
                { sender: userId2, receiver: userId1 },
            ],
        }).populate('sender receiver', 'username');
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/send-email', async (req, res) => {
    try {
        const products = await Product.find();
        for (const product of products) {
            if (product.quantity === 0) {
                console.log(product.name)
                await sendEmail(
                    req.email,
                    `Product ${product.name} Out of Stock`,
                    `The product ${product.name} is out of stock. Restock it soon!`
                );
            }
        }
        res.status(200).send('Emails sent where necessary');
    } catch (error) {
        res.status(500).send(error.message);
    }
});
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