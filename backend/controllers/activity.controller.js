const Activity = require('../models/activity.model');

exports.create = (req, res) => {
    // let title = req.body.title;
    // let id_category =  req.body.id_category;
    // let start_date = req.body.start_date;
    // let end_date = req.body.end_date;
    // let participants_quantity =  req.body.participants_quantity;
    // let address = req.body.address;
    // let id_host = req.body.id_host;
    const activity = new Activity({
        title: req.body.title,
        id_category: req.body.id_category, 
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        participants_quantity:req.body.participants_quantity,
        address: req.body.address,
        id_host: req.body.id_host
    });

    activity.save().then(data => {
      res.send(data)
      console.log("RES " + data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Tutorial."
      });
    });
}

exports.findAll = (req, res) => {
  Activity.find().populate('id_category').populate('id_host')
    .exec(function (err, activities){
      if (err) {
        res.status(500).send({ message: "Error fetching user interests: " + err });
        console.log("Error fetching user interests: " + err);
        return;
      }
      res.send(activities);
    });
}