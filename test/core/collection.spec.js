var chai = require('chai');
var expect = chai.expect;

var core = require('../../src/core/core');

describe('GameOptionCollection', () => {

  let option = new core.GameOption('option', [], []);
  let getNewCollection = () => new core.GameOptionCollection();

  describe('Quando eu instanciar uma nova coleção de opções de jogo', () => {
    let collection = getNewCollection();

    it('Então ela deve ser inicializada com um array vazio de opções', () => {
      expect(collection.get()).to.be.empty;
    });

    it('Então o tamanho dela deverá ser zero', () => {
      expect(collection.size()).to.be.equals(0);
    });
  });

  describe('Quando eu adicionar opções de jogo a uma coleção', () => {
    let collection = getNewCollection().add(option);

    it('Então a coleção deverá ser incrementada', () => {
      expect(collection.get()).to.have.length(1);
    });
  });

  describe('Quando eu solicitar o tamanho de uma coleção', () => {
    let size = getNewCollection().add(option).size();

    it('Então ela deverá retornar o número de opções adicionadas', () => {
      expect(size).to.be.equals(1);
    });
  });

  describe('Quando eu solicitar as opções de uma coleção', () => {
    let options = getNewCollection().add(option).get();

    it('Então as opções deverão ser retornadas', () => {
      expect(options[0].getName()).to.be.equals('option');
    });
  });

  describe('Quando eu alterar as opções obtidas de uma coleção', () => {
    let collection = getNewCollection().add(option);
    collection.get().push(option);

    it('Então as opções da coleção não devem ser alteradas', () => {
      expect(collection.get()).to.have.length(1);
      expect(collection.size()).to.be.equals(1);
    });
  });

});
