var util = require('../util');

module.exports = {
  message: 'Não pode haver uma opção que nunca vence.',

  validate(settings) {
    return settings.options.filter(e => util.isEmpty(e.wins)).length === 0;
  }
};
