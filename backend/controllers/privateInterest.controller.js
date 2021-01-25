const PrivateInterest = require("../models/privateInterest.model");

exports.create = (req, res) => {
    if(!req.body.id_user) {
    res.status(400).send({ message: "Le contenu ne peut pas être vide!" });
    return;
    }

    req.body.id_interest.forEach(interestId => {
        const privateInterest = new PrivateInterest({
            id_user: req.body.id_user,
            id_interest: interestId
        });

       const condition = {$and: [
            {
            id_user: req.body.id_user
            },
            {
            id_interest: interestId 
            }
        ] };

        PrivateInterest.find(condition).then(data => {
            if(data.length == 0) {
                privateInterest.save();
             }
         });
    });
};

//retrieve all private interests from database
exports.findAllInterests = (req, res) => {
    const id = req.params.id;
    const condition = {id_user: id};
    PrivateInterest.find(condition)
    .populate('id_interest')
    .exec( function (err, priviteInterests) {
        if (err) {
            res.status(500).send({ message: "Error fetching user interests: " + err });
            console.log("Error fetching user interests: " + err);
            return;
        }
        let userInterests = [];
        priviteInterests.forEach(item => {
            userInterests.push(item.id_interest);
        });
        res.send(userInterests);
    });
 }

 exports.delete = (req, res) => {
    const id_user = req.params.id;
  
    PrivateInterest.findByIdAndRemove(id_user)
    .then(data => {
        if(!data){
            res.status(404).send({
                message: `Cannot delete PrivateInterest with id=${id_user}. Maybe PrivateInterest was not found!`
            });
        }else {
            res.send({
                message: "PrivateInterest was deleted successfully!"
              });
        }  
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete PrivateInterest with id=" + id_user 
          });
    });
  
  };
  