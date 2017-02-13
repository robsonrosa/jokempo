let util = require('./util');

module.exports = {
  GameValidator: class {
    constructor() {
      let invoke = (settings, rule) => {
        if (!rule.validate(settings)) {
          throw rule.message;
        }
      };

      this.validations = [
        game => invoke(game, require('./validations/has-settings')),
        game => invoke(game, require('./validations/has-name')),
        game => invoke(game, require('./validations/has-description')),
        game => invoke(game, require('./validations/has-enough-options')),
        game => invoke(game, require('./validations/has-only-unique-names')),
        game => invoke(game, require('./validations/has-existing-options')),
        game => invoke(game, require('./validations/everyone-can-lose')),
        game => invoke(game, require('./validations/everyone-can-win')),
        game => invoke(game, require('./validations/cant-lose-and-win-at-same-time')),
        game => invoke(game, require('./validations/cant-win-itself')),
        game => invoke(game, require('./validations/cant-lose-itself')),
      ];
    }

    validate(game) {
      this.validations.forEach(v => v(game));
      return true;
    }
  }
};
