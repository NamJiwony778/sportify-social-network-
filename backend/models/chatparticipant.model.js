const mongoose = require('mongoose');

    const Chatparticipant = mongoose.model(
        'Chatparticipant',
        mongoose.Schema({ 
            id_chat: 
                {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Chat'
                },
            id_user: 
                { 
                 type: mongoose.Schema.Types.ObjectId,
                 ref: 'User'
                }
            }
        )
    );


module.exports = Chatparticipant;