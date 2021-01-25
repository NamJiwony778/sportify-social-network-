const Email = require('../models/email.model');

exports.create = (req, res) => {
   const email = new Email({
    id_sender: req.body.id_sender,
    id_receiver: req.body.id_receiver,
    title: req.body.title,
    message: req.body.message,
    isRead : req.body.isRead
   });

   email.save().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Tutorial."
    });
  });
}

exports.findAllEmails = (req, res) => {
  const id = req.params.id;
  console.log("ID " + id);
  const condition = {$or: [
    {
      id_receiver: id
    },
    {
      id_sender: id
    }
] };
 Email.find(condition).populate('id_receiver').populate('id_sender').exec(function (err, email){
    if (err) {
      res.status(500).send({ message: "Error fetching email: " + err });
      console.log("Error fetching email: " + err);
      return;
    }
    res.send(email);
  });
}


