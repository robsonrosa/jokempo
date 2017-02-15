let { BotPlayer } = require('./bot');
let { GameMatch, PlayerOption } = require('./core');
let { GameFactory } = require('./factory');
let { GameValidator } = require('./validation');

class GamePlayer {
  constructor(instance) {
    this.get = () => ({ play: () => new GameMatch(instance.game, instance.players).result() });
  }
}

class Player {
  constructor(instance) {
    let findChoice = (choice) => instance.game.getOptions().get(choice);
    this.get = (player) => new PlayerOption(player.name, findChoice(player.choice));
  }
}

class WithBots {
  constructor(instance) {
    let createBot = () => new BotPlayer(instance.game.getOptions(), 'bot' + instance.botId()).play();
    let addBots = (botsCount) => {
      for (let i = 0; i < botsCount; i++) {
        instance.players.push(createBot());
      }
    };

    this.get = (botsCount) => {
      addBots(botsCount);
      return {
        bots: () => new GamePlayer(instance).get()
      };
    };
  }
}

class Multiplayer {
  constructor(instance) {
    this.get = (players) => {
      instance.reset();
      players.forEach(p => instance.players.push(new Player(instance).get(p)));
      return new GamePlayer(instance).get();
    };
  }
}

class Duel {
  constructor(instance) {
    this.get = () => {
      instance.reset();
      return {
        between: (challenger) => {
          instance.players.push(new Player(instance).get(challenger));
          return {
            and: (opponent) => {
              instance.players.push(new Player(instance).get(opponent));
              return new GamePlayer(instance).get();
            }
          };
        }
      };
    };
  }
}

class Alone {
  constructor(instance) {
    this.get = (player) => {
      instance.reset();
      instance.players.push(new Player(instance).get(player));
      return {
        against: (botsCount) => new WithBots(instance).get(botsCount || 1)
      };
    };
  }
}

class Watch {
  constructor(instance) {
    this.get = (botsCount) => {
      instance.reset();
      return new WithBots(instance).get(botsCount || 2);
    };
  }
}

class Jokenpo {
  constructor(settings) {
    let botId = 0;
    let players = [];
    let game = new GameFactory(new GameValidator()).create(settings);

    let instance = {
      game: game,
      players: players,
      botId: () => ++botId,
      reset: () => players.splice(0),
    };

    this.watch = (botsCount) => new Watch(instance).get(botsCount);
    this.alone = (player) => new Alone(instance).get(player);
    this.duel = () => new Duel(instance).get();
    this.multiplayer = (players) => new Multiplayer(instance).get(players);

    this.getGame = () => game;
  }
}

module.exports = {
  Jokenpo: Jokenpo
};
