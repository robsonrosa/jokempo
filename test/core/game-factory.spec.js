var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var core = require('../../src/core/core');
var factory = require('../../src/core/factory');
var validation = require('../../src/core/validation');
var settings = require('../resources/settings.json');

describe('GameFactory', () => {
  let validator = { validate: sinon.spy() };

  describe('Quando eu criar uma instância de um jogo', () => {
    let game = new factory.GameFactory(validator).create(settings);

    it('Então o jogo deve existir', () => {
      expect(game).to.exists;
    });

    it('Então o jogo deve ter o nome igual a "Test"', () => {
      expect(game.getName()).to.be.equals('Test');
    });

    it('Então o jogo deve ter a descrição igual a "Test Description"', () => {
      expect(game.getDescription()).to.be.equals('Test Description');
    });

    it('Então o jogo deve ter três opções válidas', () => {
      let rock = game.getOptions().get('rock');
      expect(rock.getName()).to.be.equals('rock');
      expect(rock.getLoses()[0].getName()).to.be.equals('paper');
      expect(rock.getWins()[0].getName()).to.be.equals('scissor');
      expect(rock.getLoses()).to.have.length(1);
      expect(rock.getWins()).to.have.length(1);

      let paper = game.getOptions().get('paper');
      expect(paper.getName()).to.be.equals('paper');
      expect(paper.getLoses()[0].getName()).to.be.equals('scissor');
      expect(paper.getWins()[0].getName()).to.be.equals('rock');
      expect(paper.getLoses()).to.have.length(1);
      expect(paper.getWins()).to.have.length(1);

      let scissor = game.getOptions().get('scissor');
      expect(scissor.getName()).to.be.equals('scissor');
      expect(scissor.getLoses()[0].getName()).to.be.equals('rock');
      expect(scissor.getWins()[0].getName()).to.be.equals('paper');
      expect(scissor.getLoses()).to.have.length(1);
      expect(scissor.getWins()).to.have.length(1);
    });

    it('Deve verificar se foi criado um jogo válido', () => {
      expect(validator.validate.calledWith(settings)).to.be.true;
    });
  });
});
