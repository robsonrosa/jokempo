let { Jokenpo } = require('../core/jokenpo');
let classic = require('../resource/classic.json');

console.info(new Jokenpo(classic).watch().bots().play().toString());
