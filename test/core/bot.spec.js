let sinon = require('sinon');
let chai = require('chai');
let expect = chai.expect;

let bot = require('../../src/core/bot');
let core = require('../../src/core/core');
let util = require('../../src/core/util');
let factory = require('../../src/core/factory');
let settings = require('../resources/settings.json');

describe('BotPlayer', () => {
  let validator = { validate: sinon.spy() };
  let game = new factory.GameFactory(validator).create(settings);
  let name = 'bot-1';
  let opts = game.getOptions();
  let bot1 = new bot.BotPlayer(opts, name);

  describe('Quando eu instanciar um bot', () => {
    it('Então ele deve ser inicializado com um nome', () => {
      expect(bot1.getName()).to.be.equals(name);
    });

    it('Então ele não deve expor suas propriedades', () => {
      expect(bot1.name).to.be.undefined;
      expect(bot1.setName).to.be.undefined;
    });
  });

  describe('Quando um bot jogar', () => {
    it('Então deverá retornar uma instância de PlayerOption', () => {
      expect(bot1.play()).to.be.an.instanceOf(core.PlayerOption);
    });
  });

  describe('Quando um bot jogar várias vezes', () => {
    let repeat = (n, fn) => { while (n-- > 0) fn(); };
    let choices = [];
    repeat(15, () => choices.push(bot1.play().getChoice()));

    it('Então deverá sempre retornar uma opção válida', () => {
      choices.forEach(choice => expect(opts.get().find(opt => opt === choice)).to.exist);
    });

    it('Então deverá retornar opções aleatórias', () => {
      let t1 = choices.some(c => opts.get(0) === c) ? 1 : 0;
      let t2 = choices.some(c => opts.get(1) === c) ? 1 : 0;
      let t3 = choices.some(c => opts.get(2) === c) ? 1 : 0;
      expect(t1 + t2 + t3).to.be.greaterThan(1);
    });
  });

});
