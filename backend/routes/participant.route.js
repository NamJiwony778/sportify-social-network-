module.exports = app => {
    const participants = require('../controllers/participant.controller');
    const router = require("express").Router();

    router.post('/', participants.create);

    app.use('/api/participants', router);
};