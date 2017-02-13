module.exports = {
  message: 'Não pode haver uma opção perde de si mesma.',

  validate(settings) {
    return !settings.options.some(option => option.loses.some(l => l === option.name));
  }
};
