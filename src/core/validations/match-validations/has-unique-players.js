var util = require('../../util');

module.exports = {
  message: 'Não é possível inicar uma partida com dois jogadores com o mesmo nome.',

  validate(match) {
    return !util.duplicated(match.getPlayerOptions(), po => po.getName());
  }
};
