let chai = require('chai');
let expect = chai.expect;

let { Jokenpo } = require('../../src/core/jokenpo');
let settings = require('../resources/settings.json');

let options = ['rock', 'paper', 'scissor'];
let results = ['Vitória', 'Empate'];
let includesAtLeastOne = arr => (s => arr.some(o => s.includes(o)));

let challenger = { name: 'challenger', choice: 'rock' };
let opponent = { name: 'opponent', choice: 'paper' };
let foreigner = { name: 'foreigner', choice: 'scissor' };

describe('Integrated Tests', () => {
  describe('Quando eu assistir uma partida', () => {
    describe('E não especificar a quantidade de bots', () => {
      let watch = new Jokenpo(settings).watch().bots().play();

      it('Então deverá ter um resultado válido', () => {
        let text = watch.toString();
        expect(text).to.includes('bot1');
        expect(text).to.includes('bot2');
        expect(text).to.satisfy(includesAtLeastOne(options));
        expect(text).to.satisfy(includesAtLeastOne(results));
      });
    });

    describe('E especificar 4 bots', () => {
      let watch = new Jokenpo(settings).watch(4).bots().play();

      it('Então deverá ter 6 resultados válidos', () => {
        expect(watch).to.have.length(6);
        expect(watch[0].toString()).to.includes('bot1');
        expect(watch[0].toString()).to.includes('bot2');
        expect(watch[1].toString()).to.includes('bot1');
        expect(watch[1].toString()).to.includes('bot3');
        expect(watch[2].toString()).to.includes('bot1');
        expect(watch[2].toString()).to.includes('bot4');
        expect(watch[3].toString()).to.includes('bot2');
        expect(watch[3].toString()).to.includes('bot3');
        expect(watch[4].toString()).to.includes('bot2');
        expect(watch[4].toString()).to.includes('bot4');
        expect(watch[5].toString()).to.includes('bot3');
        expect(watch[5].toString()).to.includes('bot4');
        watch.forEach(r => {
          expect(r.toString()).to.satisfy(includesAtLeastOne(options));
          expect(r.toString()).to.satisfy(includesAtLeastOne(results));
        });
      });
    });
  });

  describe('Quando eu jogar sozinho', () => {
    describe('E não especificar a quantidade de bots', () => {
      let alone = new Jokenpo(settings).alone(challenger).against().bots().play();

      it('Então deverá ter um resultado válido', () => {
        let text = alone.toString();
        expect(text).to.includes('challenger');
        expect(text).to.includes('bot1');
        expect(text).to.satisfy(includesAtLeastOne(options));
        expect(text).to.satisfy(includesAtLeastOne(results));
      });
    });

    describe('E especificar 2 bots', () => {
      let alone = new Jokenpo(settings).alone(challenger).against(2).bots().play();

      it('Então deverá ter 3 resultados válidos', () => {
        expect(alone).to.have.length(3);
        expect(alone[0].toString()).to.includes('challenger');
        expect(alone[0].toString()).to.includes('bot1');
        expect(alone[1].toString()).to.includes('challenger');
        expect(alone[1].toString()).to.includes('bot2');
        expect(alone[2].toString()).to.includes('bot1');
        expect(alone[2].toString()).to.includes('bot2');
        alone.forEach(r => {
          expect(r.toString()).to.satisfy(includesAtLeastOne(options));
          expect(r.toString()).to.satisfy(includesAtLeastOne(results));
        });
      });
    });
  });

  describe('Quando eu jogar contra outro jogador', () => {
    let duel = new Jokenpo(settings).duel().between(challenger).and(opponent).play();

    it('Então deverá ter um resultado válido', () => {
      let text = duel.toString();
      expect(text).to.includes('challenger');
      expect(text).to.includes('opponent');
      expect(text).to.satisfy(includesAtLeastOne(options));
      expect(text).to.satisfy(includesAtLeastOne(results));
    });
  });

  describe('Quando eu jogar de galera', () => {
    let multiplayer = new Jokenpo(settings).multiplayer([challenger, opponent, foreigner]).play();

    it('Então deverá ter 3 resultados válidos', () => {
      expect(multiplayer).to.have.length(3);
      expect(multiplayer[0].toString()).to.includes('challenger');
      expect(multiplayer[0].toString()).to.includes('opponent');
      expect(multiplayer[1].toString()).to.includes('challenger');
      expect(multiplayer[1].toString()).to.includes('foreigner');
      expect(multiplayer[2].toString()).to.includes('opponent');
      expect(multiplayer[2].toString()).to.includes('foreigner');
      multiplayer.forEach(r => {
        expect(r.toString()).to.satisfy(includesAtLeastOne(options));
        expect(r.toString()).to.satisfy(includesAtLeastOne(results));
      });
    });
  });
});
