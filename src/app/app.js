let { Jokenpo } = require('../core/jokenpo');

let types = {
  classic: require('../resource/classic.json'),
  spock: require('../resource/spock.json')
};

let optionTemplate = `
                      <li class="option" id="'%option%'" onclick="window.game.choose('%option%')">
                        <div class="image">
                            <img src="./img/game-options/%option%.png" alt="%option%">
                        </div>
                        <div class="title">
                            <h3>%option%</h3>
                        </div>
                      </li>`;

function hide(element) {
  element.className = element.className.replace(/ hide/g, '').concat(' hide');
}

function show(element) {
  element.className = element.className.replace(/ hide/g, '');
}

class Game {
  constructor(config) {
    this.config = config;
    this.jokenpo = new Jokenpo(types[config.type]);
    this.gameOptions = this.jokenpo.getGame().getOptions();

    this.options = document.getElementById('game-options');
    this.resultSession = document.getElementById('result');
    this.resultMessage = document.getElementById('result-message');

    this.watchBtn = document.getElementById('watch-btn');
    this.watchSession = document.getElementById('watch');
    this.aloneSession = document.getElementById('alone');

    this.bot1 = document.getElementById('bot1');
    this.bot2 = document.getElementById('bot2');

    this.buildOptionsTemplate();
    this.toggle();
  }

  buildOptionsTemplate() {
    let options = '';
    this.gameOptions.get().forEach(option => {
      options = options.concat(this.buildOption(option));
    });
    this.options.innerHTML = options;
  }

  buildOption(option) {
    return optionTemplate.replace(/%option%/g, option.getName());
  }

  toggle() {
    if (this.config.isAlone()) {
      hide(this.watchSession);
      show(this.aloneSession);
    } else {
      show(this.watchSession);
      hide(this.aloneSession);
      this.randomize();
    }
  }

  choose(choice) {
    let player = { name: this.config.player, choice: choice };
    this.showResult(this.jokenpo.alone(player).against().bots().play());
  }

  randomize() {
    this.thinking = true;
    let size = this.gameOptions.size();

    let setRandom = (bot) => {
      let rand = Math.floor(Math.random() * size);
      let opt = this.gameOptions.get(rand).getName();
      bot.src = `./img/game-options/${opt}.png`;
      if (this.thinking) {
        setTimeout(() => setRandom(bot), 50);
      }
    };

    setRandom(this.bot1);
    setRandom(this.bot2);
  }

  stopRandomize() {
    this.thinking = false;
    setTimeout(() => {
      if (this.result.hasWinner()) {
        this.bot1.src = `./img/game-options/${this.result.getWinner().getChoice().getName()}.png`;
        this.bot2.src = `./img/game-options/${this.result.getLoser().getChoice().getName()}.png`;
      } else {
        this.bot1.src = `./img/game-options/${this.result.getDraw().getChoice().getName()}.png`;
        this.bot2.src = `./img/game-options/${this.result.getDraw().getChoice().getName()}.png`;
      }
    }, 50);
  }

  watch() {
    this.showResult(this.jokenpo.watch().bots().play());
    this.stopRandomize();
  }

  again() {
    hide(this.resultSession);
    show(this.watchBtn);
    this.randomize();
  }

  showResult(results) {
    this.result = results[0];
    hide(this.watchBtn);
    show(this.resultSession);
    this.resultMessage.innerHTML = this.result.toString();
  }
}

class GameConfig {
  constructor() {
    this.type = null;
    this.mode = null;
    this.player = null;

    this.typeReset = document.getElementById('type-reset');
    this.typeOptions = document.getElementById('type-options');
    this.modeReset = document.getElementById('mode-reset');
    this.modeOptions = document.getElementById('mode-options');

    this.txtPlayer = document.getElementById('player');

    this.settings = document.getElementById('settings');
    this.btnPlay = document.getElementById('play');

    this.game = document.getElementById('game');
    this.btnBack = document.getElementById('back');
  }

  isAlone() {
    return this.mode === 'alone';
  }

  ready() {
    // TODO: confusing rule: has type and mode. if mode is alone, player name is needed
    let canPlay = this.type && this.mode && (!this.isAlone() || this.player);
    let alone = this.isAlone();

    alone ? show(this.txtPlayer) : hide(this.txtPlayer);
    canPlay ? show(this.btnPlay) : hide(this.btnPlay);
  }

  hideOptions(options, reset) {
    hide(options);
    show(reset);
    this.ready();
  }

  showOptions(options, reset) {
    show(options);
    hide(reset);
    this.ready();
  }

  setType(type) {
    this.type = type;
    this.hideOptions(this.typeOptions, this.typeReset);
  }

  clearType() {
    this.type = null;
    this.showOptions(this.typeOptions, this.typeReset);
  }

  setMode(mode) {
    this.mode = mode;
    this.hideOptions(this.modeOptions, this.modeReset);
  }

  clearMode() {
    this.mode = null;
    this.showOptions(this.modeOptions, this.modeReset);
  }

  setPlayer(player) {
    this.player = player;
    this.ready();
  }

  play() {
    show(this.game);
    hide(this.settings);
    window.game = new Game(this);
  }

  back() {
    hide(this.game);
    show(this.settings);
  }
}

window.onload = () => {
  window.settings = new GameConfig();
};
