let util = require('./util');

let hasSettings = {
  message: 'É necessário informar um conjunto de configurações válidas.',
  validate(settings) {
    return util.hasValue(settings);
  }
};

let hasName = {
  message: 'O nome do jogo deve ser informado.',
  validate(settings) {
    return util.hasValue(settings.name);
  }
};

let hasDescription = {
  message: 'A descrição do jogo deve ser informada.',
  validate(settings) {
    return util.hasValue(settings.description);
  }
};

let hasOptions = {
  message: 'Não há opções suficientes para esse jogo funcionar.',
  validate(settings) {
    return util.hasValue(settings.options) && settings.options.length >= 3;
  }
};

let duplicate = {
  message: 'Não pode haver duas ou mais opções com o mesmo nome.',
  validate(settings) {
    return settings.options.filter((thisElement, thisIndex) => {
      let anotherElement = settings.options.filter(e => e.name === thisElement.name)[0];
      let thatIndex = settings.options.indexOf(anotherElement);
      return thisIndex === thatIndex;
    }).length === settings.options.length;
  }
};

let unknownOption = {
  message: 'Existe uma condição de vitória ou derrota não listada como uma opção.',
  validate(settings) {
    return !settings.options.some(option => {
      let unknowLoser = option.wins.some(loser => !settings.options.some(o => o.name === loser));
      let unknowWinner = option.loses.some(winner => !settings.options.some(o => o.name === winner));
      return unknowLoser || unknowWinner;
    });
  }
};

let canWin = {
  message: 'Não pode haver uma opção que nunca vence.',
  validate(settings) {
    return settings.options.filter(e => util.isEmpty(e.wins)).length === 0;
  }
};

let canLose = {
  message: 'Não pode haver uma opção que nunca perde.',
  validate(settings) {
    return settings.options.filter(e => util.isEmpty(e.loses)).length === 0;
  }
};

let loseAndWin = {
  message: 'Não pode haver uma opção que vence e perde para a mesma opção.',
  validate(settings) {
    return settings.options.find(e => e.wins.some(w => e.loses.find(l => w === l))) === undefined;
  }
};

let winItself = {
  message: 'Não pode haver uma opção vence de si mesma.',
  validate(settings) {
    return !settings.options.some(option => option.wins.some(w => w === option.name));
  }
};

let loseItself = {
  message: 'Não pode haver uma opção perde de si mesma.',
  validate(settings) {
    return !settings.options.some(option => option.loses.some(l => l === option.name));
  }
};

module.exports = {
  GameValidator: class {
    constructor() {
      this.validations = [
        hasSettings,
        hasName,
        hasDescription,
        hasOptions,
        duplicate,
        unknownOption,
        canWin,
        canLose,
        loseAndWin,
        winItself,
        loseItself
      ];

      this.invoke = (rule, settings) => {
        if (!rule.validate(settings)) {
          throw rule.message;
        }
      };
    }

    validate(settings) {
      this.validations.forEach(rule => this.invoke(rule, settings));
      return true;
    }
  }
};
