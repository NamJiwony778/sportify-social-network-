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

    // participant.save().then(data => {
    //     console.log("iiii");
    //         res.send(data)
    //     }).catch(err => {
    //         res.status(500).send({
    //           message: err.message || "Some error occurred while creating the participant."
    //         });
    //       });
    }

    exports.findAll = (req,res) => {
        console.log("Tracker");
        Participant.find().populate('id_user')
        .exec(function (err, participants){
           if(err){
               res.status(500).send({ message: "Error" });
               return;
           }
           console.log("PPPPPPPP " + participants);
           res.send(participants);
        });
    }
     //retrieve all p {rivate interests from database
// exports.findAll = (req, res) => {
//     // const id = req.params.id;
//     // const condition = {id_user: id};
//     Participant.find().populate('id_user').populate('id_activity')
//     .exec( function (err, participants) {
//         if (err) {
//             res.status(500).send({ message: "Error fetching participants: " + err });
//             console.log("Error fetching participants: " + err);
//             return;
//         }
//         // let participantsList = [];
//         // participants.forEach(item => {
//         //     participantsList .push(item.id_user);
//         // });
//         console.log("PPP " + participants);
//         res.send(participants);
//     });
// }