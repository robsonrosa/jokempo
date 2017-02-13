var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var factory = require('../../src/core/factory');
var validation = require('../../src/core/validation');

var invalid;
var settings = require('../resources/settings.json');
var noName = require('./../resources/no-name');
var noDescription = require('./../resources/no-description');
var noOptions = require('./../resources/no-options');
var duplicate = require('./../resources/duplicate');
var unknownWinner = require('./../resources/unknown-winner');
var unknownLoser = require('./../resources/unknown-loser');
var neverLose = require('./../resources/never-lose');
var neverWin = require('./../resources/never-win');
var winLose = require('./../resources/win-lose');
var loseWin = require('./../resources/lose-win');
var winItself = require('./../resources/win-itself');
var loseItself = require('./../resources/lose-itself');

describe('GameValidator', () => {
  let validate = (scenario) => () => new validation.GameValidator().validate(scenario);

  describe('Configuração válida', () => {
    describe('Quando eu informar configurações válidas de um jogo', () => {
      it('Então deverá retornar verdadeiro', () => {
        expect(validate(settings)()).to.be.true;
      });
    });
  });

  describe('Faltando informações básicas', () => {
    describe('Quando eu não informar as configurações de um jogo', () => {
      it('Então deverá ocorrer um erro informando que a configuração não é válida', () => {
        expect(validate(invalid)).to.throw('É necessário informar um conjunto de configurações válidas.');
      });
    });

    describe('Quando eu não informar o nome de um jogo', () => {
      it('Então deverá ocorrer um erro informando que um nome deve ser informado', () => {
        expect(validate(noName)).to.throw('O nome do jogo deve ser informado.');
      });
    });

    describe('Quando eu não informar a descrição de um jogo', () => {
      it('Então deverá ocorrer um erro informando que uma descrição deve ser informada', () => {
        expect(validate(noDescription)).to.throw('A descrição do jogo deve ser informada.');
      });
    });
  });

  describe('Opções inválidas', () => {
    describe('Quando eu não informar opções suficientes', () => {
      // this is a redundant validation because the other validations prevent this scenario
      // but if others validations change, this validation would become needed
      // on the other hand, it makes the test be dependent with the rules sorting
      // but its ok, because it ensure a lightweight validation runs before more complex rules
      // yes, I'm not sure about this validation rule :)
      it('Então deverá ocorrer um erro informando que não há opções suficientes para inicar um jogo', () => {
        expect(validate(noOptions)).to.throw('Não há opções suficientes para esse jogo funcionar.');
      });
    });

    describe('Quando eu informar opções repetidas', () => {
      it('Então deverá ocorrer um erro informando que não se pode criar um jogo com opções repetidas', () => {
        expect(validate(duplicate)).to.throw('Não pode haver duas ou mais opções com o mesmo nome.');
      });
    });

    describe('Quando eu referenciar uma opção de vitória não listada como uma opção', () => {
      it('Então deverá ocorrer um erro informando que uma das opções referenciadas não existe', () => {
        expect(validate(unknownLoser)).to.throw('Existe uma condição de vitória ou derrota não listada como uma opção.');
      });
    });

    describe('Quando eu referenciar uma opção de derrota não listada como uma opção', () => {
      it('Então deverá ocorrer um erro informando que uma das opções referenciadas não existe', () => {
        expect(validate(unknownWinner)).to.throw('Existe uma condição de vitória ou derrota não listada como uma opção.');
      });
    });
  });

  describe('Combinações de vitória inválidas', () => {
    describe('Quando eu informar uma opção que nunca perde', () => {
      it('Então deverá ocorrer um erro informando que não pode haver uma opção que nunca perde', () => {
        expect(validate(neverLose)).to.throw('Não pode haver uma opção que nunca perde.');
      });
    });

    describe('Quando eu informar uma opção que nunca vence', () => {
      it('Então deverá ocorrer um erro informando que não pode haver uma opção que nunca vence', () => {
        expect(validate(neverWin)).to.throw('Não pode haver uma opção que nunca vence.');
      });
    });

    describe('Quando eu informar uma opção perde e vence simultaneamente para a mesma opção', () => {
      it('Então deverá ocorrer um erro informando que não pode haver uma opção que perde e vence para a mesma opção', () => {
        expect(validate(winLose)).to.throw('Não pode haver uma opção que vence e perde para a mesma opção.');
        expect(validate(loseWin)).to.throw('Não pode haver uma opção que vence e perde para a mesma opção.');
      });
    });

    describe('Quando eu informar uma opção que perde para ela mesma', () => {
      it('Então deverá ocorrer um erro informando que não pode haver uma opção perde de si mesma', () => {
        expect(validate(loseItself)).to.throw('Não pode haver uma opção perde de si mesma.');
      });
    });

    describe('Quando eu informar uma opção que vence para ela mesma', () => {
      it('Então deverá ocorrer um erro informando que não pode haver uma opção vence de si mesma', () => {
        expect(validate(winItself)).to.throw('Não pode haver uma opção vence de si mesma.');
      });
    });
  });
});
