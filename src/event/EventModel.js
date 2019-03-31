const { db } = require('../dbConfig');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const EventSchema = new Schema({
  message: String,
  type: String,
});

const Events = mongoose.model('Events', EventSchema);
module.exports = Events;
