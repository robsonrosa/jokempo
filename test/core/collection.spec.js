var chai = require('chai');
var expect = chai.expect;

var core = require('../../src/core/core');

describe('GameOptionColelction', () => {

  let collection = null;
  let option = new core.GameOption('option', [], []);

  beforeEach(() => {
    collection = new core.GameOptionCollection();
  });

  describe('Deve ser possível criar uma nova coleção de opções de jogo', () => {
    it('Uma coleção de opções de jogo deve ser inicializada com um array vazio de opções', () => {
      expect(collection.get()).to.be.empty;
    });
  });

  describe('Deve ser possível adicionar opções de jogo a uma coleção', () => {
    it('Ao adicionar uma opção, a coleção deverá ser incrementada', () => {
      collection.add(option);
      expect(collection.get()).to.have.length(1);
    });
  });

  describe('Deve ser possível obter o tamanho de uma coleção', () => {
    it('O tamanho de uma coleção deverá ser igual ao número de opções adicionadas', () => {
      expect(collection.size()).to.be.equals(0);
      collection.add(option);
      expect(collection.size()).to.be.equals(1);
      collection.add(option);
      expect(collection.size()).to.be.equals(2);
      collection.add(option);
      expect(collection.size()).to.be.equals(3);
    });
  });

  describe('Deve ser possível obter opções da coleção', () => {
    it('Ao buscar as opções de uma coleção, as opções deverão ser retornadas', () => {
      collection.add(option);
      expect(collection.get()[0].getName()).to.be.equals('option');
    });
  });

  describe('Não deve ser permitido alterar a coleção fora do contexto da coleção', () => {
    it('Ao alterar o array retornado pela coleção, as opções da coleção não devem ser alteradas', () => {
      collection.add(option);
      collection.get().push(option);
      collection.get().push(option);
      collection.get().push(option);
      expect(collection.get()).to.have.length(1);
      expect(collection.size()).to.be.equals(1);
    });
  });

});
