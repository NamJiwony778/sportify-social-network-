module.exports = app => {
    const avatars = require('../controllers/avatar.controller');
    var router = require("express").Router();
    const storage = require("../helpers/upload");

    router.post('/', storage, avatars.create);

    router.get('/:id', avatars.findOne);
    
    // router.delete("/:id", privateInterests.delete);

    app.use('/api/avatar', router);
};