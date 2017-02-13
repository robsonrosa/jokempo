var chai = require('chai');
var expect = chai.expect;

var core = require('../../src/core/core');
var factory = require('../../src/core/factory');
var settings = require('../resources/settings.json');

describe('GameFactory', () => {

  describe('Quando eu criar uma instância de um jogo', () => {
    let game = new factory.GameFactory().create(settings);

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
      let rock = game.getOptions().get()[0];
      expect(rock.getName()).to.be.equals('rock');
      expect(rock.getLoses()[0].getName()).to.be.equals('paper');
      expect(rock.getWins()[0].getName()).to.be.equals('scissor');
      expect(rock.getLoses()).to.have.length(1);
      expect(rock.getWins()).to.have.length(1);

      let paper = game.getOptions().get()[1];
      expect(paper.getName()).to.be.equals('paper');
      expect(paper.getLoses()[0].getName()).to.be.equals('scissor');
      expect(paper.getWins()[0].getName()).to.be.equals('rock');
      expect(paper.getLoses()).to.have.length(1);
      expect(paper.getWins()).to.have.length(1);

      let scissor = game.getOptions().get()[2];
      expect(scissor.getName()).to.be.equals('scissor');
      expect(scissor.getLoses()[0].getName()).to.be.equals('rock');
      expect(scissor.getWins()[0].getName()).to.be.equals('paper');
      expect(scissor.getLoses()).to.have.length(1);
      expect(scissor.getWins()).to.have.length(1);
    });
  });

});
