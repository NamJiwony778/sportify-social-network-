const Avatar = require('../models/avatar.model');

exports.create = (req, res) => {
   let avatarFile = req.file; 
   let id_user = req.body.id_user;


    const avatarPath =  'http://localhost:3000/uploads/' + avatarFile.filename;

    const avatar = new Avatar({
        id_user,
        avatarPath
    });

    console.log("Image:", avatarPath);
    
    

    avatar.save().then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Tutorial."
      });
    });
}

exports.findOne = (req, res) => {
  const id = req.params.id;
  const condition = {id_user: id};
  console.log(condition);

  Avatar.find(condition).populate('id_user')
  .exec(function (err, avatar){
    if (err) {
      res.status(500).send({ message: "Error fetching user avatar: " + err });
      console.log("Error fetching user avatar: " + err);
      return;
    }
    res.send(avatar);
  });
};




