module.exports = app => {
    const interests = require('../controllers/interest.controller');

    var router = require('express').Router();

// Retrieve all Interests
  router.get("/", interests.findAll);

  app.use('/api/interests', router);
}