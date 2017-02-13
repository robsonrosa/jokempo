var util = require('../../util');

module.exports = {
  message: 'A opção escolhida não é válida.',

  validate(match) {
    let options = match.getGame().getOptions().get();
    return !match.getPlayerOptions().every(po => options.some(o => o.getName() === po.getChoice()));
  }
};
