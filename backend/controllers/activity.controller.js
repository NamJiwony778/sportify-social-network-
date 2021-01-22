const Activity = require('../models/activity.model');
const Participant  = require('../models/participant.model');

exports.create = (req, res) => {
   let title = req.body.title;
   let id_category = req.body.id_category;
   let imageFile = req.file; 
   let start_date = req.body.start_date;
   let end_date = req.body.end_date;
   let timeEvent = req.body.timeEvent;
   let participants_quantity = req.body.participants_quantity;
   let address = req.body.address;
   let id_host = req.body.id_host;


   console.log("Image:", imageFile);
    const imagePath =  'http://localhost:3000/uploads/' + imageFile.filename;
    console.log("ImagePath:", imagePath);
    const activity = new Activity({
        title,
        id_category,
        imagePath, 
        start_date,
        end_date,
        timeEvent,
        participants_quantity,
        address,
        id_host
    });

    console.log(title);
    console.log("Image:", imagePath);
    
    

    activity.save().then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Tutorial."
      });
    });
}

exports.findAll = (req, res) => {
    Activity.find().populate('id_category').populate('id_host')
      .exec(function (err, activities){
         var results = activities;
          if (err) {
            res.status(500).send({ message: "Error fetching user interests: " + err });
            console.log("Error fetching user interests: " + err);
            return;
          }
          const search = req.query.searchQuery;
          if (search){
            results = activities.filter(activity => filterActivityByQuery(activity, search.toLowerCase()));
          }
          res.send(results);
    });
}

function filterActivityByQuery(activity, query){
  const name = activity.id_host.first_name + ' ' + activity.id_host.last_name;
  const formattedName = name.toLowerCase();
  const categorySport= activity.id_category.name.toLowerCase();
  const formattedTitle = activity.title.toLowerCase();
  return formattedName.includes(query) || categorySport.includes(query) || formattedTitle.includes(query);
}


// Find a single Activity with an id
exports.findOne = async(req, res) => {
    const id = req.params.id;

    let activity = await Activity.findById(id).populate('id_category').populate('id_host');
    
    let condition = {id_activity: id};

    let participant = await Participant.find(condition).populate('id_user').catch(err => {
      res.status(500).send({
          message: "Error updating Activity with participant=" + id
   });
  });


      let result = {
        activity:activity,
        participant: participant
      };

      console.log(result);
      res.send(result); 
};

// Update an Activity by the id in the request
exports.update = (req, res) => {
  if(!req.body){
      return res.status(400).send({
          message: "Data to update can not be empty!"
      });  
  }

  const id = req.params.id;

  Activity.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
  .then(data => {
      if(!data) {
          res.status(404).send({
              message: `Cannot update Activity with id=${id}. Maybe Activity was not found!`
            });
      } else res.send({ message: "Activity was updated successfully." });
  })
  .catch(err => {
      res.status(500).send({
          message: "Error updating Activity with id=" + id
  });
});
};

// Delete an Activity with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Activity.findByIdAndRemove(id)
  .then(data => {
      if(!data){
          res.status(404).send({
              message: `Cannot delete Activity with id=${id}. Maybe Activity was not found!`
          });
      }else {
          res.send({
              message: "Activity was deleted successfully!"
            });
      }  
  })
  .catch(err => {
      res.status(500).send({
          message: "Could not delete Activity with id=" + id
        });
  });

};

