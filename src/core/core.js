module.exports = {
  GameOptionCollection: class {},

  Game: class {
    constructor(name, description, options) {
      this.getName = () => name;
      this.getDescription = () => description;
      this.getOptions = () => options;
    }
  }
};
