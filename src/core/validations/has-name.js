var util = require('../util');

module.exports = {
  message: 'O nome do jogo deve ser informado.',

  validate(settings) {
    return util.hasValue(settings.name);
  }
};
