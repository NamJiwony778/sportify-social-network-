module.exports = app => {
    const email = require('../controllers/email.controller');
    const router = require("express").Router();

    router.post('/', email.create);

    router.get('/:id', email.findAllEmails);

    app.use('/api/sendemail', router);
};