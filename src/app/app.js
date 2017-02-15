let { Jokenpo } = require('../core/jokenpo');

let types = {
  classic: require('../resource/classic.json'),
  //modern: require('../resource/modern.json')
};

let optionTemplate = `
                      <li class="option" onclick="window.game.choose('%option%')">
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

    this.options = document.getElementById('game-options');
    this.watchBtn = document.getElementById('watch');
    this.result = document.getElementById('result');
    this.resultMessage = document.getElementById('result-message');

    this.buildOptionsTemplate();
    config.isAlone() ? hide(watch) : show(watch);
  }

  buildOptionsTemplate() {
    let options = '';
    this.jokenpo.getGame().getOptions().get().forEach(option => {
      options = options.concat(this.buildOption(option));
    });
    this.options.innerHTML = options;
  }

  buildOption(option) {
    return optionTemplate.replace(/%option%/g, option.getName());
  }

  choose(choice) {
    // watch doesn't need to choose anything
    if (!this.config.isAlone()) {
      return;
    }

    let player = { name: this.config.player, choice: choice };
    this.showResult(this.jokenpo.alone(player).against().bots().play());
  }

  watch() {
    this.showResult(this.jokenpo.watch().bots().play());
  }

  again() {
    hide(this.result);
    show(this.watchBtn);
  }

  showResult(result) {
    hide(this.watchBtn);
    show(this.result);
    console.info(result.toString());
    this.resultMessage.innerHTML = result.toString();
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
