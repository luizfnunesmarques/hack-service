
const { Events, getTeamEvents, getPlayerEvents } = require('./eventsModel');

const eventController =  {
  async getTeamEvents(team, type) {
    try {
      const data = await getTeamEvents(team, type);
      return data;
    } catch (error) {
      throw new Error('Unabled to fetch information');
    }
  },
  async getPlayerEvents(player, type) {
    try {
      const data = await getPlayerEvents(player, type);
      return data;
    } catch (error) {
      throw new Error('Unabled to fetch information');
    }
  },
  async postEvent(event) {
    try {
      const created = await Events.create(event);
      return created;
    } catch (error) {
      console.log('error :', error);
      throw new Error('Error during event creation');
    }
  }
};

module.exports = eventController;
