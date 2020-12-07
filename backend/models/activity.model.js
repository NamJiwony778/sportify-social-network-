const mongoose = require('mongoose');

const Activity = mongoose.model(
    "Activity",
     new mongoose.Schema({
        title: String,
        id_category: 
                { 
                 type: mongoose.Schema.Types.ObjectId,
                 ref: 'Interest'
                },
        start_date: Date,
        end_date: Date,
        participants_quantity: Number,
        address: String,
        id_host: {
            type: mongoose.Schema.Types.ObjectId,
                 ref: 'User'
        }      
    })
);

module.exports = Activity;