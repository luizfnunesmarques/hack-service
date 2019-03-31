const { Router } = require('express');
const eventController = require('./eventController');
const axios = require('axios');

const getTeamState = async (team, opposingTeam) => {
  const goals = await eventController.getTeamEvents(team, 'GOAL');
  const kicks = await eventController.getTeamEvents(team, 'KICK');
  const cornerKicks = await eventController.getTeamEvents(team, 'CORNER_KICK');
  const passes = await eventController.getTeamEvents(team, 'PASS');
  const interceptedPass = await eventController.getTeamEvents(opposingTeam, 'INTERCEPTION');
  const passAccuracy = Math.floor( (interceptedPass * 100) / passes) - 100;
  const fouls = await eventController.getTeamEvents(team, 'FOUL');
  const crossAttack = await eventController.getTeamEvents(team, 'CROSS');
  const counterAttack = await eventController.getTeamEvents(team, 'COUNTER');
  const ballPossession = await eventController.getTeamEvents(team, 'BALL_POSSESSION');
  return { goals, kicks, cornerKicks, passAccuracy, fouls, crossAttack, counterAttack, ballPossession};
}
class EventRoute {
  constructor() {
    this.router = Router();
    this.routes();
  }

  async teamEvents(req, res) {
    try {
      const response = await eventController.getTeamEvents(req.query.team, req.query.type);
      res.json(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  async playerEvents(req, res) {
    try {
      const response = await eventController.getPlayerEvents(req.query.player, req.query.type);
      res.json(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getPlayerStats(req, res) {
    try {
      const player = req.query.player;
      // const playerInformation = await eventController.getPlayerInformation(req.query.player);
      const goals = await eventController.getPlayerEvents(player, 'GOAL' );
      const goalKicks = await eventController.getPlayerEvents(player, 'KICK' );
      const passes = await eventController.getPlayerEvents(player, 'PASS' );
      const dribbles = await eventController.getPlayerEvents(player, 'DRIBBLE' );

      // key passes (this needs some inteligence analyzing)
      const keyPasses = await eventController.getPlayerEvents(player, 'KEY_PASS' );
      // assists (this needs some inteligence analyzing)
      const assists = await eventController.getPlayerEvents(player, 'ASSIST' );
      // heatmap

      res.json({ goals, goalKicks, passes, dribbles, keyPasses, assists });
    } catch (error) {
      console.log(error);
      throw new Error('Failed to get player stats');
    }
  }

  async getMatchStats(req, res) {
    try {
      const teamA = await getTeamState( req.query.teamA, req.query.teamB );
      const teamB = await getTeamState( req.query.teamB, req.query.teamA );
      res.json({teamA, teamB});
    } catch (error) {
      console.log(error);
      throw new Error('Failed to get match stats');
    }
  }

  async postEvent(req, res) {
    try {
      const response = await eventController.postEvent(req.body);
      const io = req.app.get( 'io' );
      io.to('data_feed').emit('message', response);
      res.json(response);
    } catch (error) {
      console.log(error)
      throw new Error('Failed to store Event');
    }
  }

  routes() {
    this.router.get('/team', this.teamEvents);
    this.router.get('/player', this.playerEvents);
    this.router.get('/getMatchStats', this.getMatchStats);
    this.router.get('/getPlayerStats', this.getPlayerStats);

    this.router.post('/', this.postEvent);
  }
}

module.exports = new EventRoute();
