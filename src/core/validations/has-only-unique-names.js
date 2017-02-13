var util = require('../util');

module.exports = {
  message: 'Não pode haver duas ou mais opções com o mesmo nome.',

  validate(settings) {
    return settings.options.filter((thisElement, thisIndex) => {
      let anotherElement = settings.options.filter(e => e.name === thisElement.name)[0];
      let thatIndex = settings.options.indexOf(anotherElement);
      return thisIndex === thatIndex;
    }).length === settings.options.length;
  }
};
