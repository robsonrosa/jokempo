module.exports = {
  message: 'Não pode haver uma opção vence de si mesma.',

  validate(settings) {
    return !settings.options.some(option => option.wins.some(w => w === option.name));
  }
};
