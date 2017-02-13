var util = require('../util');

module.exports = {
  message: 'É necessário informar um conjunto de configurações válidas.',

  validate(settings) {
    return util.hasValue(settings);
  }
};
