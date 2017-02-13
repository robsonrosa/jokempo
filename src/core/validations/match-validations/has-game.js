var util = require('../../util');

module.exports = {
  message: 'É necessário informar um jogo para iniciar uma partida.',

  validate(match) {
    return util.hasValue(match.getGame()) && util.hasValue(match.getGame().getOptions);
  }
};
