var util = require('../../util');

module.exports = {
  message: 'É necessário informar as opções dos jogadores para iniciar uma partida.',

  validate(match) {
    return !util.isEmpty(match.getPlayerOptions());
  }
};
