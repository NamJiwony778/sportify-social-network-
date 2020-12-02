const mongoose = require('mongoose');

    const PrivateInterest = mongoose.model(
        'privateInterest',
        mongoose.Schema({ 
            id_user: 
                {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
                },
            id_interest: 
                { 
                 type: mongoose.Schema.Types.ObjectId,
                 ref: 'Interest'
                }
            }
        )
    );


module.exports = PrivateInterest;