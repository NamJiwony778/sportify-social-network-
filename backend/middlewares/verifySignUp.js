const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if(err) {
            res.status(500).send({ message: err });
        }

        if(user) {
            res.status(400).send({ message: 'Échoué! Cet email est déjà utilisé!'});
            return;
        }
        console.log(req.body.email);
        next();
    });
};

checkRolesExisted = (req, res, next) => {
   if(req.body.roles) {
       for (let i = 0; i < req.body.roles.length; i++) {
           if(!ROLES.includes(req.body.roles[i])) {
               res.status(400).send({
                  message: `Échoué! Role ${req.body.roles[i]} n'est pas existé!`
               });
               return;
           }
       }
   }
   next();
};

const verifySignUp = {
      checkDuplicateEmail,
      checkRolesExisted
};

module.exports = verifySignUp;