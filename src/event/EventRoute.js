const { Router } = require('express');
const EventController = require('./EventController');
const axios = require('axios');


class EventRoute {
  constructor() {
    this.router = Router();
    this.routes();
  }
  async someRoute(req, res) {
    try {
      const response = await EventController.getEvents(req.body);
      res.json(response);
    } catch (error) {}
  }

  async postEvent(req, res) {
    try {
      const response = await EventController.postEvent(req.body);
      const io = req.app.get('io');
      io.to('data_feed').emit('message', response);
      res.json(response);
    } catch (error) {
      console.log(error)
      throw new Error('deu ruim');
    }
  }

  routes() {
    this.router.get('/', this.someRoute);
    this.router.post('/', this.postEvent);
  }
}

module.exports = new EventRoute();
