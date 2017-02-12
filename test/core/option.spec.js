var chai = require('chai');
var expect = chai.expect;

var core = require('../../src/core/core');

describe('GameOption', () => {

  describe('Deve ser possível criar uma nova opção de jogo', () => {
    let name = 'nome de teste';
    let wins = [];
    let loses = [];
    let option = new core.GameOption(name, wins, loses);

    it('Uma opção de jogo deve ser inicializada com um nome', () => {
      expect(option.getName()).to.be.equals(name);
    });

    it('Uma opção de jogo deve ser inicializada com um array de opções que essa vence', () => {
      expect(option.getWins()).to.be.equals(wins);
    });

    it('Uma opção de jogo deve ser inicializada com um array de opções que essa perde', () => {
      expect(option.getLoses()).to.be.equals(loses);
    });

    it('Um jogo não deve expor suas propriedades', () => {
      expect(option.name).to.be.undefined;
      expect(option.wins).to.be.undefined;
      expect(option.loses).to.be.undefined;
      expect(option.setName).to.be.undefined;
      expect(option.setWins).to.be.undefined;
      expect(option.setLoses).to.be.undefined;
    });
  });

});
