const { Router } = require('express');
const SomeFeatureController = require('./someFeatureController');

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
      res.json(response);
    } catch (error) {
      console.log('errror :', errror);
      throw new Error('deu ruim route');
    }
  }

  routes() {
    this.router.get('/', this.someRoute);
    this.router.post('/', this.postMessage);
  }
}

module.exports = new SomeFeatureRoute();
