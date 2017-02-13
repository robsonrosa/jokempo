var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var core = require('../../src/core/core');
var factory = require('../../src/core/factory');
var validation = require('../../src/core/validation');
var settings = require('../resources/settings.json');

describe('GameMatchFactory', () => {
  let game = new core.Game('name', 'description', new core.GameOptionCollection());
  let p1 = new core.PlayerOption('p1', 'rock');
  let p2 = new core.PlayerOption('p2', 'paper');
  let players = [p1, p2];
  let validator = { validate: sinon.spy() };

  describe('Quando eu criar uma instância de uma partida', () => {
    let match = new factory.GameMatchFactory(validator).create(game, players);

    it('Então a partida deve existir', () => {
      expect(match).to.exist;
    });

    it('Então a partida deve ter o jogo informado', () => {
      expect(match.getGame()).to.be.deep.equals(game);
    });

    it('Então a partida deve ter os jogadores informados', () => {
      expect(match.getPlayerOptions()).to.be.deep.equals(players);
    });

    it('Deve verificar se foi criado um jogo válido', () => {
      expect(validator.validate.calledWithMatch(sinon.match.instanceOf(core.GameMatch))).to.be.true;
    });
  });
});
