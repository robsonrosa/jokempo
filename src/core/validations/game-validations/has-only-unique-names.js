var util = require('../../util');

module.exports = {
  message: 'Não pode haver duas ou mais opções com o mesmo nome.',

  validate(settings) {
    return !util.duplicated(settings.options, opt => opt.name);
  }
};
