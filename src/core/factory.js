let core = require('./core');

module.exports = {
  GameFactory: class {
    create(settings) {
      let { name, description, options } = this.disassembly(settings);
      return new core.Game(name, description, options);
    }

    disassembly(settings) {
      if (!settings) {
        return { name: undefined, description: undefined, options: undefined};
      }


      return {
        name: settings.name,
        description: settings.description,
        options: this.createOptions(settings.options || [])
      };
    }

    createOptions(options) {
      let metadata = this.createMetada(options);

      options.forEach(option => {
        let match = this.searchMetadata(metadata, option.name);
        this.addWins(metadata, option, match);
        this.addLoses(metadata, option, match);
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
        // TODO: unsafe (implement find)
        let match = metadata.filter(m => m.name === option.getName())[0];
        match.wins.forEach(w => option.getWins().push(this.searchOption(collection.get(), w.name)));
        match.loses.forEach(l => option.getLoses().push(this.searchOption(collection.get(), l.name)));
      });

      return collection;
    }

    searchMetadata(metadata, name) {
      // TODO: unsafe (implement find)
      return metadata.filter(m => m.name === name)[0];
    }

    searchOption(options, name) {
      // TODO: unsafe (implement find)
      return options.filter(o => o.getName() === name)[0];
    }

    addWins(metadata, option, match) {
      let wins = option.wins || [];
      wins.forEach(w => match.wins.push(this.searchMetadata(metadata, w)));
    }

    addLoses(metadata, option, match) {
      let loses = option.loses || [];
      loses.forEach(l => match.loses.push(this.searchMetadata(metadata, l)));
    }
  }
};
