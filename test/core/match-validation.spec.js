var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var core = require('../../src/core/core');
var factory = require('../../src/core/factory');
var validation = require('../../src/core/validation');
var settings = require('../resources/settings.json');

describe('GameMatchValidator', () => {
  let game = new factory.GameFactory({ validate: sinon.spy() }).create(settings);
  let validate = (scenario) => () => new validation.GameMatchValidator().validate(scenario);
  let p0 = new core.PlayerOption('p0', new core.GameOption('p0'));
  let p1 = new core.PlayerOption('p1', game.getOptions().get(0));
  let p2 = new core.PlayerOption('p2', game.getOptions().get(1));
  let p22 = p2;

  describe('Configuração válida', () => {
    describe('Quando eu informar configurações válidas de uma partida', () => {
      it('Então deverá retornar verdadeiro', () => {
        expect(validate(new core.GameMatch(game, [p1, p2]))()).to.be.true;
      });
    });
  });

  describe('GameMatch inválido', () => {
    describe('Quando a partida informada for nula', () => {
      it('Então deverá ocorrer um erro informando que é necessário informar uma partida', () => {
        expect(validate(null)).to.throw('É necessário informar uma partida para iniciar uma partida.');
      });
    });

    describe('Quando a partida informada for indefinida', () => {
      it('Então deverá ocorrer um erro informando que é necessário informar uma partida', () => {
        expect(validate(undefined)).to.throw('É necessário informar uma partida para iniciar uma partida.');
      });
    });

    describe('Quando a partida informada não for uma partida', () => {
      it('Então deverá ocorrer um erro informando que é necessário informar uma partida', () => {
        expect(validate({})).to.throw('É necessário informar uma partida para iniciar uma partida.');
      });
    });
  });

  describe('Game inválido', () => {
    describe('Quando o jogo informado for nulo', () => {
      it('Então deverá ocorrer um erro informando que é necessário informar um jogo', () => {
        expect(validate(new core.GameMatch(null, [p1, p2]))).to.throw('É necessário informar um jogo para iniciar uma partida.');
      });
    });

    describe('Quando o jogo informado for indefinido', () => {
      it('Então deverá ocorrer um erro informando que é necessário informar um jogo', () => {
        expect(validate(new core.GameMatch(undefined, [p1, p2]))).to.throw('É necessário informar um jogo para iniciar uma partida.');
      });
    });

    describe('Quando o jogo informado não for um jogo', () => {
      it('Então deverá ocorrer um erro informando que é necessário informar um jogo', () => {
        expect(validate(new core.GameMatch({}, [p1, p2]))).to.throw('É necessário informar um jogo para iniciar uma partida.');
      });
    });
  });

  describe('Opções dos jogadores inválidas', () => {
    describe('Quando eu não informar as opções dos jogadores', () => {
      it ('Então deverá ocorrer um erro informando que é necessário informar as opções dos jogadores', () => {
        expect(validate(new core.GameMatch(game))).to.throw('É necessário informar as opções dos jogadores para iniciar uma partida.');
      });
    });

    describe('Quando eu não informar pelo menos duas opções dos jogadores', () => {
      it ('Então deverá ocorrer um erro informando que é necessário informar ao menus duas opções dos jogadores', () => {
        expect(validate(new core.GameMatch(game, [p1]))).to.throw('É necessário informar ao menos duas opções dos jogadores para iniciar uma partida.');
      });
    });

    describe('Quando um jogador informar uma opção inválida', () => {
      it ('Então deverá ocorrer um erro informando que a opção escolhida é inválida', () => {
        expect(validate(new core.GameMatch(game, [p0, p1]))).to.throw('A opção escolhida não é válida.');
      });
    });

    describe('Quando houver dois jogadores com o mesmo nome', () => {
      it ('Então deverá ocorrer um erro informando que não pode iniciar uma partida com jogadores repetidos', () => {
        expect(validate(new core.GameMatch(game, [p2, p22]))).to.throw('Não é possível inicar uma partida com dois jogadores com o mesmo nome.');
      });
    });
  });
});
