module.exports = app => {
    const avatars = require('../controllers/avatar.controller');
    var router = require("express").Router();
    const storage2 = require("../helpers/upload");

    router.post('/', storage2, avatars.create);

    router.get('/:id', avatars.findOne);
    
    // router.delete("/:id", privateInterests.delete);

    app.use('/api/avatar', router);
};