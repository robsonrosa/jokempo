var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var factory = require('../../src/core/factory');
var validation = require('../../src/core/validation');

// settings
var invalid;
var settings = require('../resources/settings.json');

describe('GameValidator', () => {
  // helper
  let build = (settings) => new factory.GameFactory({ validate: sinon.spy() }).create(settings);
  let validate = (settings) => () => new validation.GameValidator().validate(build(settings));

  describe('Quando eu informar configurações válidas de um jogo', () => {
    it('Então deverá retornar verdadeiro', () => {
      expect(validate(settings)()).to.be.true;
    });
  });

  describe('Quando eu não informar as configurações de um jogo', () => {
    it('Então deverá ocorrer um erro informando que a configuração não é válida', () => {
      expect(validate(invalid)).to.throw('É necessário informar um conjunto de configurações válidas.');
    });
  });

});
