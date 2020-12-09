module.exports = app => {
    const participants = require('../controllers/participant.controller');
    const router = require("express").Router();

    router.post('/', participants.create);

    router.get('/', participants.findAll);

    app.use('/api/participants', router);
};