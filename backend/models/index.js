//intialize Mongoose

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.interest = require('./interest.model');
db.user = require('./user.model');
db.role = require('./role.model');

db.ROLES = ['user, admin'];
db.INTERESTS = ['baseball', 'basketball', 'football', 'football américain', 'golf', 'hockey', 'tennis', 'volleyball', 'cyclisme'];

module.exports = db;
