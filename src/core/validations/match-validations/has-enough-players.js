var util = require('../../util');
const VALIDATION_MIN_PLAYERS = 2;

module.exports = {
  message: 'É necessário informar ao menos duas opções dos jogadores para iniciar uma partida.',

  validate(match) {
    return match.getPlayerOptions().length >= VALIDATION_MIN_PLAYERS;
  }
};
