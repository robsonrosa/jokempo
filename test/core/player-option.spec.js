var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var core = require('../../src/core/core');

describe('PlayerOption', () => {

  describe('Quando eu instanciar uma partida', () => {
    let name = 'p1';
    let choice = 'rock';
    let playerOption = new core.PlayerOption(name, choice);

    it('Então ele deve ser inicializado com um nome', () => {
      expect(playerOption.getName()).to.be.equals(name);
    });

    it('Então ele deve ser inicializado com um array de opções dos jogadores', () => {
      expect(playerOption.getChoice()).to.be.equals(choice);
    });

    it('Então ele não deve expor suas propriedades', () => {
      expect(playerOption.name).to.be.undefined;
      expect(playerOption.choice).to.be.undefined;
      expect(playerOption.setName).to.be.undefined;
      expect(playerOption.setChoice).to.be.undefined;
    });
  });

});
