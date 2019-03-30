const mongoose = require('mongoose');

const devStringConnection = `mongodb://${process.env.MLAB_USER}:${
  process.env.MLAB_PASSWORD
}@ds017165.mlab.com:17165/daznhack`;

mongoose.Promise = global.Promise;

mongoose.connect(devStringConnection, { useNewUrlParser: true });

const db = mongoose.connection;

module.exports = { db };
