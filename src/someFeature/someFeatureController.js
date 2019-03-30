const Messages = require('./someFeatureModel');
class SomeFeatureController {
  async getSomeData() {
    try {
      return new Promise(resolve => {
        resolve('Hello!');
      });
    } catch (error) {}
  }
  async postMessage() {
    try {
      const created = await Messages.create({ message: 'test' });
      return created;
    } catch (error) {
      throw new Error('deu ruim');
    }
  }
}
module.exports = new SomeFeatureController();
