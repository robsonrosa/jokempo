var util = require('../../util');

module.exports = {
  message: 'A descrição do jogo deve ser informada.',

  validate(settings) {
    return util.hasValue(settings.description);
  }
};
