module.exports = {
  GameMatch: class {
    constructor(game, playerOptions) {
      this.getGame = () => game;
      this.getPlayerOptions = () => playerOptions;
    }
  }
};
