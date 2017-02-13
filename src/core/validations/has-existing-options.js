var util = require('../util');

module.exports = {
  message: 'Existe uma condição de vitória ou derrota não listada como uma opção.',

  validate(settings) {
    return !settings.options.some(option => {
      let unknowLoser = option.wins.some(loser => !settings.options.some(o => o.name === loser));
      let unknowWinner = option.loses.some(winner => !settings.options.some(o => o.name === winner));
      return unknowLoser || unknowWinner;
    });
  }
};
