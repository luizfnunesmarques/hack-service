const { db } = require('../dbConfig');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const EventSchema = new Schema({
  type: {
    type: String,
    enum: ['GOAL', 'GOAL_ATTEMPT', 'FOUL', 'KEY_PASS', 'PASS', 'INTERCEPT', 'BALL_POSSESSION', 'ASSIST', 'CORNER_KICK', 'CROSS_ATTACK', 'COUNTER_ATTACK', 'DRIBBLE' ]
  },
  player: String,
  team: String,
  timestamp: Number,
  increment: {
    type: Number,
    default: 0
  }
});

const Events = mongoose.model( 'Events', EventSchema );
const getTeamEvents = async ( team, type ) => Events.count({ $and: [ { team }, { type } ] });
const getPlayerEvents = async ( player, type ) => Events.count({ $and: [ { player }, { type } ] } );

module.exports = { Events, getTeamEvents, getPlayerEvents };
