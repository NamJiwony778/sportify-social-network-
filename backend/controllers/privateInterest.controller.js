// const db = require("../models");
// const PrivateInterest = db.privateInterests;
const PrivateInterest = require("../models/privateInterest.model");;

exports.create = (req, res) => {
    if(!req.body._id) {
    res.status(400).send({ message: "Le contenu ne peut pas être vide!" });
    return;
    }

    //create personalInterest 
    const privateInterest = new PrivateInterest({
        id_user: req.body._id,
        id_interest: req.body._id
    });

    //save personalInterest to DB
    privateInterest.save(privateInterest)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Une erreur s'est produite lors de la création d'interet."
    });
  });
};

//retrieve all interests from database
exports.findAll = (req, res) => {
 
    privateInterest.find().then(data => {
        console.log(data);
        res.send(data);
     }).catch(err => {
         res.status(500).send({
           message:
             err.message || "Une erreur s'est produite lors de la récupération des centres d'intérêt privés."
         });
     });
 }