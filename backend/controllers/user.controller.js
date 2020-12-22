const User = require('../models/user.model');
const PrivateInterest = require('../models/privateInterest.model');
const Activity = require('../models/activity.model');
const Following = require('../models/following.model');
const Follower = require('../models/follower.model');

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



    const condition1 = {id_following: id};
    console.log("cond1" + JSON.stringify(condition1));
    let followings = await Following.find(condition1).populate('id_user');

    if (!followings) {
      res.status(500).send({ message: "Error fetching following: " + err });
      console.log("Error fetching following: " + err);
      return;
    }

    const condition2 = {id_user: id};
    let followers = await Follower.find(condition2).populate('id_follower');

    if (!followers) {
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
      activities: activities,
      followings: followings,
      followers: followers
    };
    console.log(result);
    res.send(result);
  }

  
exports.create = (req, res) => {
  if(!req.body.id_user) {
    res.status(400).send({ message: "Le contenu ne peut pas être vide!" });
    return;
    }

   
        const following = new Following({
            id_user: req.body.id_user,
            id_following: req.body.id_following
        });

        const follower = new Follower({
          id_user: req.body.id_following,
          id_follower: req.body.id_user
      });
     

      const conditionFollowing = {$and: [
        {
        id_user: req.body.id_user
        },
        {
        id_following: req.body.id_following
        }
    ] };

    const conditionFollower = {$and: [
      {
        id_user: req.body.id_following
      },
      {
        id_follower: req.body.id_user
      }
  ] };

    Following.find(conditionFollowing).then(data => {
        if(data.length == 0) {
           following.save();
         }
     }); 
     
    Follower.find(conditionFollower).then(data => {
      if(data.length == 0) {
         follower.save();
       }
   });
}