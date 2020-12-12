const Participant  = require('../models/participant.model');

exports.create = (req, res) => {
    if(!req.body.id_user) {
        res.status(400).send({ message: "Le contenu ne peut pas être vide!" });
        return;
        }
    
    const participant = new Participant ({
        id_user: req.body.id_user,
        id_activity: req.body.id_activity
    });

    const condition = {$and: [
        {
        id_user: req.body.id_user
        },
        {
        id_activity: req.body.id_activity
        }
    ] };

    Participant.find(condition).then(data => {
        if(data.length == 0) {
            participant.save();
         }
    });
    }

    exports.findAll = (req,res) => {
        Participant.find().populate('id_user')
        .exec(function (err, participants){
           if(err){
               res.status(500).send({ message: "Error" });
               return;
           }
           res.send(participants);
        });
    }
    