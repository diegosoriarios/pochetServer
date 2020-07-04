module.exports = {
  notNullStringField: (value, name) => {
    if (typeof value != 'string' || valor === 0)
      throw new InvalidArgumentError(`É necessário preencher o campo ${nome}!`)
  },

  minFieldSize: (value, name, min) => {
    if (value.length < min) {
      throw new InvalidArgumentError(
        `O campo ${nome} precisa ser maior que ${minimo} caracteres!`
      )
    }
  },

  maxFieldSize: (value, name, max) => {
    if (value.length > max) {
      throw new InvalidArgumentError(
        `O campo ${nome} precisa ser menor que ${maximo} caracteres!`
      )
    }
  }
}