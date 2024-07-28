const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            trim: true
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            trim: true
        },
        senderName: {
            type: String
        },
        recieverName: {
            type: String
        },
        content: {
            type: String,
            required: true,
            trim: true
        },
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;