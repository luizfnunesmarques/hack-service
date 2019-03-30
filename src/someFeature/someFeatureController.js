class SomeFeatureController {
  async getSomeData() {
    try {
      return new Promise(resolve => {
        resolve('Hello!');
      });
    } catch (error) {}
  }
}
module.exports = new SomeFeatureController();
