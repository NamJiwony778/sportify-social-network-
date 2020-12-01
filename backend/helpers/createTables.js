const db = require('../models');
const Interest = db.interest;
const Role = db.role;

//create roles 
function initial(){
    Role.estimatedDocumentCount((err, count) => {
        if(!err && count === 0) {
            new Role({
                name: 'user'
            }).save(err => {
                if (err) {
                    console.log('error', err);
                }
            });
            new Role ({
                name: 'admin'
            }).save(err => {
                if(err) {
                    console.log('error', err);
                }
            });
        }
    })
}

function createInterest(){
    Interest.estimatedDocumentCount((err, count) => {
        if(!err && count === 0) {
            new Interest({
                name: 'baseball'
            }).save(err => {
                if (err) {
                    console.log('error', err);
                }
            });
            new Interest ({
                name: 'basketball'
            }).save(err => {
                if(err) {
                    console.log('error', err);
                }
            });
            new Interest ({
                name: 'football'
            }).save(err => {
                if(err) {
                    console.log('error', err);
                }
            });
            new Interest ({
                name: 'football américain'
            }).save(err => {
                if(err) {
                    console.log('error', err);
                }
            });
            new Interest ({
                name: 'golf'
            }).save(err => {
                if(err) {
                    console.log('error', err);
                }
            });
            new Interest ({
                name: 'hockey'
            }).save(err => {
                if(err) {
                    console.log('error', err);
                }
            });
            new Interest ({
                name: 'tennis'
            }).save(err => {
                if(err) {
                    console.log('error', err);
                }
            });
            new Interest ({
                name: 'volleyball'
            }).save(err => {
                if(err) {
                    console.log('error', err);
                }
            });
            new Interest ({
                name: 'cyclisme'
            }).save(err => {
                if(err) {
                    console.log('error', err);
                }
            });
        };
    });
}



exports.createInterest = createInterest();
exports.initial = initial();