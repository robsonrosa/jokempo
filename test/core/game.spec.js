var chai = require('chai');
var expect = chai.expect;

var core = require('../../src/core/core');

describe('Game', () => {

  describe('Quando eu instanciar um jogo', () => {
    let name = 'nome de teste';
    let description = 'descrição de teste';
    let options = new core.GameOptionCollection();
    let game = new core.Game(name, description, options);

    it('Então ele deve ser inicializado com um nome', () => {
      expect(game.getName()).to.be.equals(name);
    });

    it('Então ele deve ser inicializado com uma descrição', () => {
      expect(game.getDescription()).to.be.equals(description);
    });

    it('Então ele deve ser inicializado com uma coleção de opções', () => {
      expect(game.getOptions()).to.be.equals(options);
    });

    it('Então ele não deve expor suas propriedades', () => {
      expect(game.name).to.be.undefined;
      expect(game.description).to.be.undefined;
      expect(game.options).to.be.undefined;
      expect(game.setName).to.be.undefined;
      expect(game.setDescription).to.be.undefined;
      expect(game.setOptions).to.be.undefined;
    });
  });

});
