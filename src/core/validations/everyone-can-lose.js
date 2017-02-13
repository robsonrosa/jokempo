var util = require('../util');

module.exports = {
  message: 'Não pode haver uma opção que nunca perde.',

  validate(settings) {
    return settings.options.filter(e => util.isEmpty(e.loses)).length === 0;
  }
};
