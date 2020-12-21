const User = require('../models/user.model');
const PrivateInterest = require('../models/privateInterest.model');
const Activity = require('../models/activity.model');

  exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };


  exports.findOne = async(req, res) => {
    const id = req.params.id;
    let user = await User.findById(id);

    if (!user) {
        res.status(500).send({ message: "Error fetching user interests: " + err });
        console.log("Error fetching user interests: " + err);
        return;
      }
      const condition = {id_user: id};
      let privateInterests = await PrivateInterest.find(condition).populate('id_interest');

      if (!privateInterests) {
        res.status(500).send({ message: "Error fetching user interests: " + err });
        console.log("Error fetching user interests: " + err);
        return;
    }
      
    const cond = {id_host: id};
    let activities = await Activity.find(cond).populate('id_category');
      
    if (!activities) {
      res.status(500).send({ message: "Error fetching user interests: " + err });
      console.log("Error fetching user interests: " + err);
      return;
  }

    let result = {
      user: user,
      privateinterests: privateInterests,
      activities: activities
    };
    res.send(result);
  }