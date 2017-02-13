let util = require('./util');
let core = require('./core');

class GameOptionCollectionFactory {
  create(options) {
    let metadata = this.createMetada(options);

    options.forEach(option => {
      let match = this.searchMetadata(metadata, option.name);
      this.addMetadataWins(metadata, option, match);
      this.addMetadataLoses(metadata, option, match);
    });

    return this.createCollection(metadata);
  }

  createMetada(options) {
    return options.map(option => ({ name: option.name, wins: [], loses: [] }));
  }

  createCollection(metadata) {
    let collection = new core.GameOptionCollection();
    metadata.forEach(option => collection.add(new core.GameOption(option.name, [], [])));

    collection.get().forEach(option => {
      let match = metadata.find(m => m.name === option.getName());
      this.addOptionWins(collection.get(), match, option);
      this.addOptionLoses(collection.get(), match, option);
    });

    return collection;
  }

  searchMetadata(metadata, name) {
    return metadata.find(m => m.name === name);
  }

  searchOption(options, name) {
    return options.find(o => o.getName() === name);
  }

  addMetadataWins(metadata, option, match) {
    util.array(option.wins).forEach(w => match.wins.push(this.searchMetadata(metadata, w)));
  }

  addMetadataLoses(metadata, option, match) {
    util.array(option.loses).forEach(l => match.loses.push(this.searchMetadata(metadata, l)));
  }

  addOptionWins(options, match, option) {
    util.array(match.wins).forEach(w => option.getWins().push(this.searchOption(options, w.name)));
  }

  addOptionLoses(options, match, option) {
    util.array(match.loses).forEach(l => option.getLoses().push(this.searchOption(options, l.name)));
  }
}

module.exports = {
  GameFactory: class {
    constructor() {
      this.optionsFactory = new GameOptionCollectionFactory();
    }

    create(settings) {
      let { name, description, options } = this.disassembly(settings);
      return new core.Game(name, description, options);
    }

    disassembly(settings) {
      if (!settings) {
        return { name: undefined, description: undefined, options: undefined };
      }

      return {
        name: settings.name,
        description: settings.description,
        options: this.optionsFactory.create(util.array(settings.options))
      };
    }
  }
};
