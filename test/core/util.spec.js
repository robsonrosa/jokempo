var chai = require('chai');
var expect = chai.expect;

var util = require('../../src/core/util');

describe('Utils', () => {
  describe('.hasValue', () => {
    describe('Quando eu chamar o método hasValue passando null', () => {
      let result = util.hasValue(null);
      it('Então o resultado deverá ser falso', () => {
        expect(result).to.be.false;
      });
    });

    describe('Quando eu chamar o método hasValue passando undefined', () => {
      let result = util.hasValue(undefined);
      it('Então o resultado deverá ser falso', () => {
        expect(result).to.be.false;
      });
    });

    describe('Quando eu chamar o método hasValue passando uma string vazia', () => {
      let result = util.hasValue('');
      it('Então o resultado deverá ser verdadeiro', () => {
        expect(result).to.be.true;
      });
    });

    describe('Quando eu chamar o método hasValue passando zero', () => {
      let result = util.hasValue(0);
      it('Então o resultado deverá ser verdadeiro', () => {
        expect(result).to.be.true;
      });
    });

    describe('Quando eu chamar o método hasValue passando um objeto', () => {
      let result = util.hasValue({});
      it('Então o resultado deverá ser verdadeiro', () => {
        expect(result).to.be.true;
      });
    });

    describe('Quando eu chamar o método hasValue passando um array vazio', () => {
      let result = util.hasValue([]);
      it('Então o resultado deverá ser verdadeiro', () => {
        expect(result).to.be.true;
      });
    });
  });

  describe('.isEmpty', () => {
    describe('Quando eu chamar o método isEmpty passando null', () => {
      let result = util.isEmpty(null);
      it('Então o resultado deverá ser verdadeiro', () => {
        expect(result).to.be.true;
      });
    });

    describe('Quando eu chamar o método isEmpty passando undefined', () => {
      let result = util.isEmpty(undefined);
      it('Então o resultado deverá ser verdadeiro', () => {
        expect(result).to.be.true;
      });
    });

    describe('Quando eu chamar o método isEmpty passando u', () => {
      let result = util.isEmpty(undefined);
      it('Então o resultado deverá ser verdadeiro', () => {
        expect(result).to.be.true;
      });
    });

    describe('Quando eu chamar o método isEmpty passando uma string vazia', () => {
      let result = util.isEmpty('');
      it('Então o resultado deverá ser verdadeiro', () => {
        expect(result).to.be.true;
      });
    });

    describe('Quando eu chamar o método isEmpty passando zero', () => {
      let result = util.isEmpty(0);
      it('Então o resultado deverá ser verdadeiro', () => {
        expect(result).to.be.true;
      });
    });

    describe('Quando eu chamar o método isEmpty passando um objeto', () => {
      let result = util.isEmpty({});
      it('Então o resultado deverá ser verdadeiro', () => {
        expect(result).to.be.true;
      });
    });

    describe('Quando eu chamar o método isEmpty passando um array vazio', () => {
      let result = util.isEmpty([]);
      it('Então o resultado deverá ser verdadeiro', () => {
        expect(result).to.be.true;
      });
    });

    describe('Quando eu chamar o método isEmpty passando um array com um elemento', () => {
      let result = util.isEmpty([1]);
      it('Então o resultado deverá ser false', () => {
        expect(result).to.be.false;
      });
    });
  });

  describe('.array', () => {
    describe('Quando eu chamar o método array passando null', () => {
      let result = util.array(null);
      it('Então o resultado deverá ser verdadeiro', () => {
        expect(result).to.be.deep.equals([]);
      });
    });

    describe('Quando eu chamar o método array passando undefined', () => {
      let result = util.array(undefined);
      it('Então o resultado deverá ser verdadeiro', () => {
        expect(result).to.be.deep.equals([]);
      });
    });

    describe('Quando eu chamar o método array passando u', () => {
      let result = util.array(undefined);
      it('Então o resultado deverá ser verdadeiro', () => {
        expect(result).to.be.deep.equals([]);
      });
    });

    describe('Quando eu chamar o método array passando uma string vazia', () => {
      let result = util.array('');
      it('Então o resultado deverá ser verdadeiro', () => {
        expect(result).to.be.deep.equals([]);
      });
    });

    describe('Quando eu chamar o método array passando zero', () => {
      let result = util.array(0);
      it('Então o resultado deverá ser verdadeiro', () => {
        expect(result).to.be.deep.equals([]);
      });
    });

    describe('Quando eu chamar o método array passando um objeto', () => {
      let result = util.array({});
      it('Então o resultado deverá ser verdadeiro', () => {
        expect(result).to.be.deep.equals([]);
      });
    });

    describe('Quando eu chamar o método array passando um array vazio', () => {
      let result = util.array([]);
      it('Então o resultado deverá ser verdadeiro', () => {
        expect(result).to.be.deep.equals([]);
      });
    });

    describe('Quando eu chamar o método array passando um array com um elemento', () => {
      let result = util.array([1]);
      it('Então o resultado deverá ser false', () => {
        expect(result).to.be.deep.equals([1]);
      });
    });
  });
});
