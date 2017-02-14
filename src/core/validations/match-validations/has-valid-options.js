var util = require('../../util');

module.exports = {
  message: 'A opção escolhida não é válida.',

  validate(match) {
    let players = match.getPlayerOptions();
    let options = match.getGame().getOptions().get();
    return players.every(po => options.some(o => o.getName() === po.getChoice().getName()));
  }
};
