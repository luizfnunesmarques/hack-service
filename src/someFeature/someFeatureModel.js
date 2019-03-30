//process.env.NODE_ENV = 'test';
const { db } = require('../dbConfig');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const MessagesSchema = new Schema({
  message: String
});

const Messages = mongoose.model('Messages', MessagesSchema);
module.exports = Messages;
