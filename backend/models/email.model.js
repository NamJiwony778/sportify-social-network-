const mongoose = require('mongoose');

const Email = mongoose.model(
    "Email",
    new mongoose.Schema({
        id_sender: {
            type: mongoose.Schema.Types.ObjectId,
                 ref: 'User'
        },   
        id_receiver: {
            type: mongoose.Schema.Types.ObjectId,
                 ref: 'User'
        }, 
        title: String,
        message: String,
        isRead: Boolean
    }, {timestamps: true})
);

module.exports = Email;