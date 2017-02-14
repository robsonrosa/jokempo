let core = require('./core');

module.exports = {
  BotPlayer: class {
    constructor(collection, name) {
      let choose = () => collection.get(Math.floor(Math.random() * collection.size()));

      this.getName = () => name;
      this.play = () => new core.PlayerOption(name, choose());
    }
  }
};
