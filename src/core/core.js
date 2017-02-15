let util = require('./util');
let resultProperty = Symbol();

class BattleVictory {
  for(winner) {
    this.winner = winner;
    return this;
  }

  against(loser) {
    this.loser = loser;
    return new BattleResult(this.winner, loser, { draw: false });
  }
}

class BattleDraw {
  between(playerOne) {
    this.playerOne = playerOne;
    return this;
  }

  and(playerTwo) {
    this.playerTwo = playerTwo;
    return new BattleResult(this.playerOne, playerTwo, { draw: true });
  }

}

class BattleResult {
  constructor(winner, loser, { draw }) {
    this.hasWinner = () => !draw;
    this.getWinner = () => draw ? null : winner;
    this.getLoser = () => draw ? null : loser;
    this.getDraw = () => !draw ? null : { getChoice: () => winner.getChoice() };
    this.toString = () => {
      return draw ?
        `Empate! "${winner.getName()}" e "${loser.getName()}" escolheram "${winner.getChoice().getName()}"` :
        `Vitória de "${winner.getName()}"! Escolheu "${winner.getChoice().getName()}" e venceu de "${loser.getName()}" que escolheu "${loser.getChoice().getName()}"`;
    };
  }
}

class Battle {
  constructor() {
    this.challengerWins = () => this.challenger.getChoice().getWins().some(loser => loser.getName() === this.opponent.getChoice().getName());
    this.challengerLoses = () => this.challenger.getChoice().getLoses().some(winner => winner.getName() === this.opponent.getChoice().getName());
  }

  between(challenger) {
    this.challenger = challenger;
    return this;
  }

  and(opponent) {
    this.opponent = opponent;
    return this;
  }

  result() {
    if (this.challengerWins()) {
      return new BattleVictory().for(this.challenger).against(this.opponent);
    } else if (this.challengerLoses()) {
      return new BattleVictory().for(this.opponent).against(this.challenger);
    } else {
      return new BattleDraw().between(this.challenger).and(this.opponent);
    }
  }
}

class GameMatch {
  constructor(game, playerOptions) {
    this.getGame = () => game;
    this.getPlayerOptions = () => playerOptions;
    this[resultProperty] = null;
  }

  result() {
    let results = this[resultProperty];

    if (results) {
      return results;
    }

    results = [];

    let players = this.getPlayerOptions();
    let n = players.length;

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        let challenger = players[i];
        let opponent = players[j];
        let battle = new Battle().between(challenger).and(opponent);
        results.push(battle.result());
      }
    }

    this[resultProperty] = results;
    return results;
  }
}

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
    constructor(name, choice) {
      this.getName = () => name;
      this.getChoice = () => choice;
    }
  },

  GameMatch: GameMatch,

  GameDuel: class {
    constructor(game, challenger, opponent) {
      this.match = new GameMatch(game, [challenger, opponent]);
    }

    result() {
      return this.match.result()[0];
    }
  }

};
