var util = require('../../util');

module.exports = {
  message: 'É necessário informar uma partida para iniciar uma partida.',

  validate(match) {
    return util.hasValue(match) && util.hasValue(match.getGame) && util.hasValue(match.getPlayerOptions);
  }
};
