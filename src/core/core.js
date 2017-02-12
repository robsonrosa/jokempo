module.exports = {
  GameOptionCollection: class {},

  Game: class {
    constructor(name, description, options) {
      this.getName = () => name;
      this.getDescription = () => description;
      this.getOptions = () => options;
    }
  },

  GameOption: class {
    constructor(name, wins, loses) {
      this.getName = () => name;
      this.getWins = () => wins;
      this.getLoses = () => loses;
    }
  }
};
