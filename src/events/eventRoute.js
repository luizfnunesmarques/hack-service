const { Router } = require('express');
const eventController = require('./eventController');
const axios = require('axios');

class EventRoute {
  constructor() {
    this.router = Router();
    this.routes();
  }

  async teamEvents(req, res) {
    try {
      const response = await eventController.getTeamEvents(req.query.team, req.query.type);
      res.json(response);
    } catch (error) {}
  }

  async playerEvents(req, res) {
    try {
      const response = await eventController.getPlayerEvents(req.query.player, req.query.type);
      res.json(response);
    } catch (error) {}
  }

  async postEvent(req, res) {
    try {
      const response = await eventController.postEvent(req.body);      
      res.json(response);
    } catch (error) {
      console.log(error)
      throw new Error('deu ruim');
    }
  }

  routes() {
    this.router.get('/team', this.teamEvents);
    this.router.get('/player', this.playerEvents);
    this.router.post('/', this.postEvent);
  }
}

module.exports = new EventRoute();
