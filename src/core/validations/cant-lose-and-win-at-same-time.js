var util = require('../util');

module.exports = {
  message: 'Não pode haver uma opção que vence e perde para a mesma opção.',

  validate(settings) {
    return settings.options.find(e => e.wins.some(w => e.loses.find(l => w === l))) === undefined;
  }
};
