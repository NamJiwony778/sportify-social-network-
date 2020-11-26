const mongoose = require('mongoose');

const User = mongoose.model(
    "User",
    new mongoose.Schema({
       first_name: String,
       family_name: String,
       email: String,
       password: String, 
       isPrivate: Boolean,
       isDeleted: Boolean,
       avatarPath: String,
       roles: [
          { 
           type: mongoose.Schema.Types.ObjectId,
           ref: 'Role'
          }
       ]
    })
);