var util = require('../util');
const VALIDATION_MIN_OPTIONS = 3;

module.exports = {
  message: 'Não há opções suficientes para esse jogo funcionar.',

  validate(settings) {
    return util.hasValue(settings.options) && settings.options.length >= VALIDATION_MIN_OPTIONS;
  }
};
