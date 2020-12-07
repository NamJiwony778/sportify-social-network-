module.exports = app => {
    const activities = require('../controllers/activity.controller');
    const router = require("express").Router();

    // Create a new Activity
    router.post('/',  activities.create);

    // Retrieve all Activities
    router.get('/', activities.findAll);
    
    app.use('/api/activities', router);

};
