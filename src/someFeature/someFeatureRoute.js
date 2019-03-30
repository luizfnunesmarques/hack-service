const { Router } = require('express');
const SomeFeatureController = require('./someFeatureController');
const axios = require('axios');


class SomeFeatureRoute {
  constructor() {
    this.router = Router();
    this.routes();
  }
  async someRoute(req, res) {
    try {
      const response = await SomeFeatureController.getSomeData(req.body);
      res.json(response);
    } catch (error) {}
  }

  async postMessage(req, res) {
    try {
      const response = await SomeFeatureController.postMessage();
      console.log(response)
      await axios.post('http://localhost:8080/update', response);
      res.json(response);
    } catch (error) {
      console.log(error)
      throw new Error('deu ruim');
    }
  }

  routes() {
    this.router.get('/', this.someRoute);
    this.router.post('/', this.postMessage);
  }
}

module.exports = new SomeFeatureRoute();
