const { Router } = require('express');
const SomeFeatureController = require('./someFeatureController');

class SomeFeatureRoute {
  constructor() {
    this.router = Router();
    this.routes();
  }
  async someRoute(req, res) {
    try {
      const response = await SomeFeatureController.getSomeData();
      res.json(response);
    } catch (error) {}
  }

  routes() {
    this.router.get('/', this.someRoute);
  }
}

module.exports = new SomeFeatureRoute();
