const mongoose = require('mongoose');

    const Participant = mongoose.model(
        'Participant',
        mongoose.Schema({ 
            id_user: 
                {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
                },
            id_activity: 
                { 
                 type: mongoose.Schema.Types.ObjectId,
                 ref: 'Activity'
                }
            }
        )
    );


module.exports = Participant;