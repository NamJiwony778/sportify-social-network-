//intialize Mongoose

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.interest = require('./interest.model');
db.user = require('./user.model');
db.role = require('./role.model');
db.privateinterests = require('./privateInterest.model');
db.activities = require('./activity.model');
db.participants = require('./participant.model');
db.emails = require('./email.model');
db.following = require('./following.model');
db.follower = require('./follower.model');
db.chat = require('./chat.model');
db.message = require('./message.model');
db.chatparticipant = require('./chatparticipant.model');
db.avatar = require('./avatar.model');

db.ROLES = ['user, admin'];
db.INTERESTS = ['baseball', 'basketball', 'football', 'football américain', 'golf', 'hockey', 'tennis', 'volleyball', 'cyclisme'];

module.exports = db;
