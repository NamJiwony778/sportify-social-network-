// const Chat = require('../models/chat.model');
// const Message = require('../models/message.model');
// const Chatparticipant = require('../models/chatparticipant.model');

// exports.create = (req, res) => {
//     const chat = new Chat ({
//       id_creator: req.body.id_user
//     });
//     const message = new Message ({
//       message: req.body.message,
//       id_sender: req.body.id_user,
//       id_chat: req.body.id_chat
//     });
//     const chatparticipant =  new Chatparticipant ({
//       id_user: req.body.id_user,
//       id_chat: req.body.id_chat
//     });

//     chat.save().then(data => {
//     res.send(data);
//   }).catch(err => {
//     res.status(500).send({
//       message: err.message || "Some error occurred while creating the Chat."
//     });
//   });

  
//   message.save().then(data => {
//     res.send(data);
//   }).catch(err => {
//     res.status(500).send({
//       message: err.message || "Some error occurred while creating the message"
//     });
//   });

  
//   chatparticipant.save().then(data => {
//     res.send(data);
//   }).catch(err => {
//     res.status(500).send({
//       message: err.message || "Some error occurred while creating the chatparticipant."
//     });
//   });
// }



// exports.findAll = (req, res) => {
//     const id = req.params.id;
//     const condition = {id_user: id};

//     Chat.find(condition),populate('id_user').exec(function (err, chat){
//         if (err) {
//           res.status(500).send({ message: "Error fetching chat: " + err });
//           console.log("Error fetching chat: " + err);
//           return;
//         }
//         res.send(chat);
//       });
// }