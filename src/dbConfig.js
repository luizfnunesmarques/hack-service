const mongoose = require('mongoose');

const devStringConnection = 'mongodb://ramonprata:daznhack1@ds017165.mlab.com:17165/daznhack';

mongoose.Promise = global.Promise;

mongoose.connect(devStringConnection, { useNewUrlParser: true });

const db = mongoose.connection;

module.exports = { db };
