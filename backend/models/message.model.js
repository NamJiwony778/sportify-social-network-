const mongoose = require('mongoose');

const Message = mongoose.model(
    "Message",
    new mongoose.Schema({
       message: String,
       id_sender: {
        type: mongoose.Schema.Types.ObjectId,
             ref: 'User'
     },   
       id_chat: {
        type: mongoose.Schema.Types.ObjectId,
             ref: 'Chat'
     }
    }, {timestamps: true})
);

module.exports = Message;