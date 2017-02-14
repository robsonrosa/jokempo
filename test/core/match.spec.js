var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var core = require('../../src/core/core');

let factorial = n => n - 1 <= 0 ? n : n * factorial(n - 1);
let combinatorialAnalysis = n => (factorial(n) / factorial(n - 2)) / 2;
//(setSize! / (setSize - subSetSize)!) / 2!

describe('GameMatch', () => {
  let game = new core.Game('name', 'description', new core.GameOptionCollection());
  let p1 = new core.PlayerOption('p1', 'rock');
  let p2 = new core.PlayerOption('p2', 'paper');
  let p3 = new core.PlayerOption('p3', 'scissor');
  let p4 = new core.PlayerOption('p4', 'scissor');
  let duel = [p1, p2];
  let threesome = [p1, p2, p3];

  describe('Quando eu instanciar uma partida', () => {
    let match = new core.GameMatch(game, duel);

    it('Então ela deve ser inicializado com um nome', () => {
      expect(match.getGame()).to.be.deep.equals(game);
    });

    it('Então ela deve ser inicializado com um array de opções dos jogadores', () => {
      expect(match.getPlayerOptions()).to.be.deep.equals(duel);
    });

    it('Então ela não deve expor suas propriedades', () => {
      expect(match.game).to.be.undefined;
      expect(match.playerOptions).to.be.undefined;
      expect(match.setGame).to.be.undefined;
      expect(match.setPlayerOptions).to.be.undefined;
    });
  });

  describe('Quando o resultado da partida for socilitado', () => {
    describe('E dois jogadores estiverem se enfretando', () => {
      let players = duel;
      let match = new core.GameMatch(game, players);

      // p1 vs p2
      it('Então o resultado deverá ser um array de resultados (1) com as combinações únicas possíveis', () => {
        expect(match.result()).to.have.length(combinatorialAnalysis(players.length));
      });

      // p1 vs p2 (rock vs paper)
      describe('E a opção do playerOne vence a opção do playerTwo', () => {
        let result = new core.GameMatch(game, [p1, p2]).result()[0];

        it('Então o único resultado não será um empate', () => {
          expect(result.hasWinner).to.be.true;
        });

        it('Então o único resultado terá playerTwo como vencedor', () => {
          expect(result.winner).to.be.deep.equals(p2);
        });

        it('Então o único resultado terá playerOne como perdedor', () => {
          expect(result.loser).to.be.deep.equals(p1);
        });

        it('Então a mensagem do resultado deverá tornar explícito o resultado da partida', () => {
          expect(result.toString()).to.be.equals('Vitória de "p2"! Escolheu "paper" e venceu de "p1" que escolheu "paper"');
        });
      });

      // p3 vs p4 (scissor vs scissor)
      describe('E a opção do playerOne empata com a opção do playerTwo', () => {
        let result = new core.GameMatch(game, [p3, p4]).result()[0];

        it('Então o único resultado será um empate', () => {
          expect(result.hasWinner).to.be.false;
        });

        it('Então o único resultado não terá vencedor', () => {
          expect(result.winner).to.not.exist;
        });

        it('Então o único resultado não terá perdedor', () => {
          expect(result.loser).to.not.exist;
        });

        it('Então a mensagem do resultado deverá tornar explícito o resultado da partida', () => {
          expect(result.toString()).to.be.equals('Empate! "p3" e "p4" escolheram "scissor"');
        });
      });
    });

    describe('E três jogadores estiverem se enfretando', () => {
      let players = threesome;
      let match = new core.GameMatch(game, players);

      // p1 vs p2
      // p1 vs p3
      // p2 vs p3
      it('Então o resultado deverá ser um array de resultados (3) com as combincações únicas possíveis', () => {
        expect(match.result()).to.have.length(combinatorialAnalysis(players.length));
      });

      // p1 vs p2 (rock vs paper)
      // p1 vs p3 (rock vs scissor)
      // p2 vs p3 (paper vs scissor)
      describe('E a opção do playerOne vence da opção do playerTwo que vence a opção do playerThree', () => {
        let results = new core.GameMatch(game, [p1, p2, p3]).result();

        // p1 vs p2 (rock vs paper)
        describe('1', () => {
          let first = results[0];

          it('Então o primeiro resultado não será um empate', () => {
            expect(first.hasWinner).to.be.true;
          });

          it('Então o primeiro resultado terá playerTwo como vencedor', () => {
            expect(first.winner).to.be.deep.equals(p2);
          });

          it('Então o primeiro resultado terá playerOne como perdedor', () => {
            expect(first.loser).to.be.deep.equals(p1);
          });
        });

        // p1 vs p3 (rock vs scissor)
        describe('2', () => {
          let second = results[0];

          it('Então o segundo resultado não será um empate', () => {
            expect(second.hasWinner).to.be.true;
          });

          it('Então o segundo resultado terá playerOne como vencedor', () => {
            expect(second.winner).to.be.deep.equals(p1);
          });

          it('Então o segundo resultado terá playerThree como perdedor', () => {
            expect(second.loser).to.be.deep.equals(p3);
          });
        });

        // p2 vs p3 (paper vs scissor)
        describe('3', () => {
          let third = results[0];

          it('Então o terceiro resultado não será um empate', () => {
            expect(third.hasWinner).to.be.true;
          });

          it('Então o terceiro resultado terá playerThree como vencedor', () => {
            expect(third.winner).to.be.deep.equals(p3);
          });

          it('Então o terceiro resultado terá playerTwo como perdedor', () => {
            expect(third.loser).to.be.deep.equals(p2);
          });
        });

      });
    });
  });

});
