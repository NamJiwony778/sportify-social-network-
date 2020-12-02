module.exports = app => {
    const privateInterests = require('../controllers/privateInterest.controller');
    var router = require("express").Router();

    router.post('/', privateInterests.create);

    router.get('/:id', privateInterests.findAllInterests);

    app.use('/api/privateinterests', router);
};