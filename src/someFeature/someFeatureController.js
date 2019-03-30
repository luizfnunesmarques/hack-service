const { instanciaIO } = require('../appConfig');
const Messages = require('./someFeatureModel');
class SomeFeatureController {
  async getSomeData() {
    try {
      return new Promise(resolve => {
        resolve('Hello!');
      });
    } catch (error) {}
  }
  async postMessage(message) {
    try {
      const created = await Messages.create({ message });
      instanciaIO.emit('message', created);
      return created;
    } catch (error) {
      console.log('error :', error);
      // throw new Error('deu ruim controller');
    }
  }
}
module.exports = new SomeFeatureController();
