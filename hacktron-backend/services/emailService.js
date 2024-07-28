const nodemailer = require('nodemailer')
const dotenv = require('dotenv').config()

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        });
        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

const User = require("../models/userModel")
const Product = require("../models/productModel")
const sendMailsToEveryone = async () => {
    const users = await User.find();
    const products = await Product.find();
    for (const user of users) {
        for (const product of products) {
            if (product.quantity <= 0) {
                await sendEmail(
                    user.email,
                    `Indore Municipal Corporation | Product ${product.name} Out of Stock`,
                    `The product ${product.name} is out of stock. Restock it soon!`
                );
            }
        }
    }
}

module.exports = { sendEmail, sendMailsToEveryone };