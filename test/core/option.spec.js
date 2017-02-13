var chai = require('chai');
var expect = chai.expect;

var core = require('../../src/core/core');

describe('GameOption', () => {

  describe('Quando eu instanciar uma opção de jogo', () => {
    let name = 'nome de teste';
    let wins = [];
    let loses = [];
    let option = new core.GameOption(name, wins, loses);

    it('Então ela deve ser inicializada com um nome', () => {
      expect(option.getName()).to.be.equals(name);
    });

    it('Então ela deve ser inicializada com um array de opções que essa vence', () => {
      expect(option.getWins()).to.be.equals(wins);
    });

    it('Então ela deve ser inicializada com um array de opções que essa perde', () => {
      expect(option.getLoses()).to.be.equals(loses);
    });

    it('Então ela não deve expor suas propriedades', () => {
      expect(option.name).to.be.undefined;
      expect(option.wins).to.be.undefined;
      expect(option.loses).to.be.undefined;
      expect(option.setName).to.be.undefined;
      expect(option.setWins).to.be.undefined;
      expect(option.setLoses).to.be.undefined;
    });
  });

});
