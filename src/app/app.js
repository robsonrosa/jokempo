let { Jokempo } = require('../core/jokempo');
let classic = require('../resource/classic.json');

console.info(new Jokempo(classic).watch().bots().play().toString());
