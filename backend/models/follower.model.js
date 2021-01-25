const mongoose = require('mongoose');

    const Follower = mongoose.model(
        'Follower',
        mongoose.Schema({ 
            id_user: 
                {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
                },
            id_follower: 
                { 
                 type: mongoose.Schema.Types.ObjectId,
                 ref: 'User'
                }
            }
        )
    );


module.exports = Follower;