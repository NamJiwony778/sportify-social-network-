const mongoose = require('mongoose');

const Chat = mongoose.model(
    "Chat",
    new mongoose.Schema({
       id_creator: String,
       updated_at: { type: Date, default: Date.now },
   })
);

module.exports = Chat;