var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var core = require('../../src/core/core');

describe('GameMatch', () => {

  describe('Quando eu instanciar uma partida', () => {
    let game = new core.Game('name', 'description', new core.GameOptionCollection());
    let p1 = new core.PlayerOption('p1', 'rock');
    let p2 = new core.PlayerOption('p2', 'paper');
    let players = [p1, p2];
    let match = new core.GameMatch(game, players);

    it('Então ele deve ser inicializado com um nome', () => {
      expect(match.getGame()).to.be.deep.equals(game);
    });

    it('Então ele deve ser inicializado com um array de opções dos jogadores', () => {
      expect(match.getPlayerOptions()).to.be.deep.equals(players);
    });

    it('Então ele não deve expor suas propriedades', () => {
      expect(match.game).to.be.undefined;
      expect(match.playerOptions).to.be.undefined;
      expect(match.setGame).to.be.undefined;
      expect(match.setPlayerOptions).to.be.undefined;
    });
  });

});
