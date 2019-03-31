const { db } = require('../dbConfig');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const EventSchema = new Schema({
  type: String, // [GOAL, FAULT, PASS, SHOT, DEFENSE, STEAL, MISSED_PASS, BALL_DOMAIN ]
  player1: String,
  player2: String,
  team: String,
  misc: String,
  timestamp: Number,
});

const Events = mongoose.model( 'Events', EventSchema );
const getTeamEvents = async ( team, type ) => Events.count({ $and: [ { team }, { type } ] });
const getPlayerEvents = async ( player, type ) => Events.count({ $and: [ { player1: player }, { type } ] } );

module.exports = { Events, getTeamEvents, getPlayerEvents };
