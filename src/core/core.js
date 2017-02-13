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

      this.get = (which) => {
        if (typeof which === 'string') {
          return gameOptions.find(opt => opt.getName() === which);
        }

        if (typeof which === 'number') {
          return gameOptions[which];
        }

        return gameOptions.slice();
      };

      this.add = (gameOption) => {
        gameOptions.push(gameOption);
        return this;
      };
    }
  },

  PlayerOption: class {
    constructor(name, option) {

    }
  }

};
