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
    return util.hasValue(game.getName());
  }
};

let hasDescription = {
  message: 'A descrição do jogo deve ser informada.',
  validate(game) {
    return util.hasValue(game.getDescription());
  }
};

let hasOptions = {
  message: 'Não há opções suficientes para esse jogo funcionar.',
  validate(game) {
    return util.hasValue(game.getOptions()) && game.getOptions().size() >= 3;
  }
};

let duplicate = {
  message: 'Não pode haver duas ou mais opções com o mesmo nome.',
  validate(game) {
    return game.getOptions().get().filter((thisElement, thisIndex) => {
      let anotherElement = game.getOptions().get().filter(e => e.getName() === thisElement.getName())[0];
      let thatIndex = game.getOptions().get().indexOf(anotherElement);
      return thisIndex === thatIndex;
    }).length === game.getOptions().size();
  }
};

let unknownOption = {
  message: 'unknown.',
  validate(game) {
    return util.hasValue(game.getOptions()) && game.getOptions().size() >= 3;
  }
};

let canWin = {
  message: 'Não pode haver uma opção que nunca vence.',
  validate(game) {
    return game.getOptions().get().filter(e => util.isEmpty(e.getWins())).length === 0;
  }
};

let canLose = {
  message: 'Não pode haver uma opção que nunca perde.',
  validate(game) {
    return game.getOptions().get().filter(e => util.isEmpty(e.getLoses())).length === 0;
  }
};

let loseAndWin = {
  message: 'Não pode haver uma opção que vence e perde para a mesma opção.',
  validate(game) {
    return game.getOptions().get().filter(e => e.getWins().some(w => e.getLoses().filter(l => w.getName() === l.getName()).length > 0)).length === 0;
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
