var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var core = require('../../src/core/core');
var factory = require('../../src/core/factory');
var settings = require('../resources/settings.json');

describe('GameDuel', () => {
  let game = new factory.GameFactory({ validate: sinon.spy() }).create(settings);
  let p1 = new core.PlayerOption('p1', game.getOptions().get('rock'));
  let p2 = new core.PlayerOption('p2', game.getOptions().get('paper'));
  let match = new core.GameMatch(game, [p1, p2]);

  describe('Quando o resultado do duelo for socilitado', () => {
    let duel = new core.GameDuel(game, p1, p2);

    it('Então um GameMatch deverá ser invocado com o jogo, o p1 e o p2', () => {
      expect(duel.match.getGame()).to.be.equals(match.getGame());
      expect(duel.match.getPlayerOptions()[0]).to.be.equals(match.getPlayerOptions()[0]);
      expect(duel.match.getPlayerOptions()[1]).to.be.equals(match.getPlayerOptions()[1]);
    });

    it('Então o resultado deverá ser um único resultado', () => {
      expect(duel.result().toString()).to.be.equals(match.result()[0].toString());
    });
  });
});
