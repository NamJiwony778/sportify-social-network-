const mongoose = require('mongoose');

const Interest = mongoose.model(
    "Interest",
    new mongoose.Schema({
       name: String
    })
);

module.exports = Interest;