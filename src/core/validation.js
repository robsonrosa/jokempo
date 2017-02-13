let util = require('./util');

let invoke = (target, rule) => {
  if (!rule.validate(target)) {
    throw rule.message;
  }
};

module.exports = {
  GameValidator: class {
    constructor() {
      this.validations = [
        game => invoke(game, require('./validations/game-validations/has-settings')),
        game => invoke(game, require('./validations/game-validations/has-name')),
        game => invoke(game, require('./validations/game-validations/has-description')),
        game => invoke(game, require('./validations/game-validations/has-enough-options')),
        game => invoke(game, require('./validations/game-validations/has-only-unique-names')),
        game => invoke(game, require('./validations/game-validations/has-existing-options')),
        game => invoke(game, require('./validations/game-validations/everyone-can-lose')),
        game => invoke(game, require('./validations/game-validations/everyone-can-win')),
        game => invoke(game, require('./validations/game-validations/cant-lose-and-win-at-same-time')),
        game => invoke(game, require('./validations/game-validations/cant-win-itself')),
        game => invoke(game, require('./validations/game-validations/cant-lose-itself'))
      ];
    }

    validate(game) {
      this.validations.forEach(v => v(game));
      return true;
    }
  },

  GameMatchValidator: class {
    constructor() {
      this.validations = [
        match => invoke(match, require('./validations/match-validations/has-match')),
        match => invoke(match, require('./validations/match-validations/has-game')),
        match => invoke(match, require('./validations/match-validations/has-players')),
        match => invoke(match, require('./validations/match-validations/has-enough-players')),
        match => invoke(match, require('./validations/match-validations/has-unique-players')),
        match => invoke(match, require('./validations/match-validations/has-valid-options'))
      ];
    }

    validate(match) {
      this.validations.forEach(v => v(match));
      return true;
    }
  }
};
