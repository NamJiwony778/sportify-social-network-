const Chat = require('../models/chat.model');
const Participant = require('../models/chatparticipant.model');
const Message =  require('../models/message.model');

exports.create = (req, res) => {
   let message = req.body.message;
   let id_sender = req.body.id_sender;
    
    const chat = new Chat ({
        id_sender
    });

    const chatparticipant = Participant({
        id_chat,
        id_sender
    });

    const messageChat = new Message({
        message,
        id_sender,
        id_chat
    });

 
    
    

    chat.save();
    chatparticipant.save();
    messageChat.save().then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Tutorial."
      });
    });
}
