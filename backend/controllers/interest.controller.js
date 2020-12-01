const Interest = require("../models/interest.model");

//retrieve all interests from database
exports.findAll = (req, res) => {
 
   Interest.find().then(data => {
       console.log(data);
       res.send(data);
    }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving interests."
        });
    });
}