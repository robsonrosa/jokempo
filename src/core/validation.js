let util = require('./util');

let hasSettings = {
  message: 'É necessário informar um conjunto de configurações válidas.',
  validate(game) {
    return util.hasValue(game);
  }
};

let hasName = {
  message: 'O nome do jogo deve ser informado.',
  validate(game) {
    return util.hasValue(game.name);
  }
};

let hasDescription = {
  message: 'A descrição do jogo deve ser informada.',
  validate(game) {
    return util.hasValue(game.description);
  }
};

let hasOptions = {
  message: 'Não há opções suficientes para esse jogo funcionar.',
  validate(game) {
    return util.hasValue(game.options) && game.options.length >= 3;
  }
};

let duplicate = {
  message: 'Não pode haver duas ou mais opções com o mesmo nome.',
  validate(game) {
    return game.options.filter((thisElement, thisIndex) => {
      let anotherElement = game.options.filter(e => e.name === thisElement.name)[0];
      let thatIndex = game.options.indexOf(anotherElement);
      return thisIndex === thatIndex;
    }).length === game.options.length;
  }
};

let unknownOption = {
  message: 'unknown.',
  validate(game) {
    return util.hasValue(game.options) && game.options.length >= 3;
  }
};

let canWin = {
  message: 'Não pode haver uma opção que nunca vence.',
  validate(game) {
    return game.options.filter(e => util.isEmpty(e.wins)).length === 0;
  }
};

let canLose = {
  message: 'Não pode haver uma opção que nunca perde.',
  validate(game) {
    return game.options.filter(e => util.isEmpty(e.loses)).length === 0;
  }
};

let loseAndWin = {
  message: 'Não pode haver uma opção que vence e perde para a mesma opção.',
  validate(game) {
    return game.options.find(e => e.wins.some(w => e.loses.find(l => w === l))) === undefined;
  }
};

let winItself = {
  message: '',
  validate(game) {
    return true;
  }
};

let loseItself = {
  message: '',
  validate(game) {
    return true;
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

      this.invoke = (rule, game) => {
        if (!rule.validate(game)) {
          throw rule.message;
        }
      };
    }

    validate(game) {
      this.validations.forEach(rule => this.invoke(rule, game));
      return true;
    }
  }
};
