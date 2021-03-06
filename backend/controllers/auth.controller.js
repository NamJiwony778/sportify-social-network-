const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    avatar: req.body.avatar,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    isPrivate: req.body.isPrivate
  });
  
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "L'utilisateur a été enregistré avec succès!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "L'utilisateur a été enregistré avec succès!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "L'utilisateur n'est pas trouvé." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Mot de passe incorrect!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar: user.avatar,
        email: user.email,
        roles: authorities,
        isPrivate: user.isPrivate,
        accessToken: token
      });
    });
};

// Update an Activity by the id in the request
exports.update = (req, res) => {
  console.log("Test");
  const id = req.body.id;
  console.log("ID " +  id); 
  if(!req.body){
      return res.status(400).send({
          message: "Data to update can not be empty!"
      });  
  }

  User.updateOne({_id: id}, { $set: {isPrivate: req.body.isPrivate}})
  .then(data => {
      if(!data) {
          res.status(404).send({
              message: `Cannot update User with id=${id}. Maybe User was not found!`
            });
      } else res.send({ message: "User was updated successfully." });
  })
  .catch(err => {
      res.status(500).send({
          message: "Error updating User with id=" + id
  });
  console.log("ID " +  id); 
});
};