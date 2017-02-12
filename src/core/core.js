module.exports = {

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
  },

  GameOptionCollection: class {
    constructor() {
      let gameOptions = [];
      this.size = () => gameOptions.length;
      this.get = () => gameOptions.slice();
      this.add = (gameOption) => gameOptions.push(gameOption);
    }
  }

};
