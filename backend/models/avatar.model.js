const mongoose = require('mongoose');

    const Avatar = mongoose.model(
        'avatar',
        mongoose.Schema({ 
            id_user: 
                {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
                },
                avatarPath: String
            },
        )
    );

module.exports = Avatar;