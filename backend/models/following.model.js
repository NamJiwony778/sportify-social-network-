const mongoose = require('mongoose');

    const Following = mongoose.model(
        'Following',
        mongoose.Schema({ 
            id_user: 
                {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
                },
            id_following: 
                { 
                 type: mongoose.Schema.Types.ObjectId,
                 ref: 'User'
                }
            }
        )
    );


module.exports = Following;