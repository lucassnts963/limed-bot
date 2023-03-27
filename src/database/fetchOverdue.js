const knex = require('./index.js');
const _ = require('lodash')

async function fetch() {
  try {
    const result = await knex.select(
      'receber.id', 
      'receber.id_cliente',
      'cliente.nome',
      'receber.parcela',
      'receber.emissao', 
      'receber.vencimento',
      'receber.valor_original',
      'receber.valor_rec',
      'receber.historico'
      ).from('receber')
      .where('receber.valor_rec', '=', 0)
      .where('receber.tipo', '!=', 'CC')
      .whereRaw(`receber.vencimento <= date(now() - interval '40' day)`)
      .join('cliente', 'cliente.id', '=', 'receber.id_cliente')
    
    const groupBy = _.groupBy(result, value => value.id_cliente)

    return groupBy
  } catch (error) {
    console.log(error)
    return undefined
  }
}

module.exports = fetch