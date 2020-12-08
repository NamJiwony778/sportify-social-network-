module.exports = app => {
    const activities = require('../controllers/activity.controller');
    const router = require("express").Router();

    // Create a new Activity
    router.post('/',  activities.create);

    // Retrieve all Activities
    router.get('/', activities.findAll);

    // Retrieve a single Activity with id
    router.get("/:id", activities.findOne);

    // Update an Activity with id
    router.put("/:id", activities.update);
  
    // Delete an Activity with id
    router.delete("/:id", activities.delete);
  
    app.use('/api/activities', router);

};
