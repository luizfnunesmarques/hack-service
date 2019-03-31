const Events = require('./EventModel');
class EventController {
  async getEvents() {
    try {
      return new Promise(resolve => {
        resolve('Hello!');
      });
    } catch (error) {}
  }
  async postEvent(data) {
    try {
      const created = await Events.create(data);
      return created;
    } catch (error) {
      throw new Error('deu ruim controller');
    }
  }
}
module.exports = new EventController();
