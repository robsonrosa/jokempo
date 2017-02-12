var chai = require('chai');
var expect = chai.expect;

var core = require('../../src/core/core');

describe('Game', () => {

  describe('Deve ser possível criar um novo jogo', () => {
    let name = 'nome de teste';
    let description = 'descrição de teste';
    let options = new core.GameOptionCollection();
    let game = new core.Game(name, description, options);

    it('Um jogo deve ser inicializado com um nome', () => {
      expect(game.getName()).to.be.equals(name);
    });

    it('Um jogo deve ser inicializado com uma descrição', () => {
      expect(game.getDescription()).to.be.equals(description);
    });

    it('Um jogo deve ser inicializado com uma coleção de opções', () => {
      expect(game.getOptions()).to.be.equals(options);
    });

    it('Um jogo não deve expor suas propriedades', () => {
      expect(game.name).to.be.undefined;
      expect(game.description).to.be.undefined;
      expect(game.options).to.be.undefined;
      expect(game.setName).to.be.undefined;
      expect(game.setDescription).to.be.undefined;
      expect(game.setOptions).to.be.undefined;
    });
  });

});
