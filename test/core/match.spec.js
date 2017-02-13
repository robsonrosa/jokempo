var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var core = require('../../src/core/core');
var match = require('../../src/core/match');

describe('GameMatch', () => {

  describe('Quando eu instanciar uma partida', () => {
    let game = new core.Game('name', 'description', new core.GameOptionCollection());
    let p1 = new core.PlayerOption('p1', 'rock');
    let p2 = new core.PlayerOption('p2', 'paper');
    let players = [p1, p2];
    let instance = new match.GameMatch(game, players);

    it('Então ele deve ser inicializado com um nome', () => {
      expect(instance.getGame()).to.be.deep.equals(game);
    });

    it('Então ele deve ser inicializado com um array de opções dos jogadores', () => {
      expect(instance.getPlayerOptions()).to.be.deep.equals(players);
    });

    it('Então ele não deve expor suas propriedades', () => {
      expect(instance.game).to.be.undefined;
      expect(instance.playerOptions).to.be.undefined;
      expect(instance.setGame).to.be.undefined;
      expect(instance.setPlayerOptions).to.be.undefined;
    });
  });

});
