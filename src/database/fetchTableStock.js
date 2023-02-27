const knex = require("./index.js");

async function fetch() {
  try {
    const result = await knex
      .select(
        "estoque.id_produto as id",
        knex.raw(
          "(SUM(CASE WHEN operacao = 'E' THEN quantidade ELSE 0 END) - " +
            "SUM(CASE WHEN operacao = 'S' THEN quantidade ELSE 0 END)) as quantidade"
        ),
        "produto.nome",
        "produto.descricao",
        "produto.codigo_barras",
        "produto.preco_venda",
        "fabricante.nome as fabricante"
      )
      .from("estoque")
      .join("produto", "estoque.id_produto", "=", "produto.id")
      .join("fabricante", "produto.id_fabricante", "=", "fabricante.id")
      .groupBy("id_produto")
      .havingRaw("quantidade > 0")
      .orderBy("produto.nome", "asc");

    return result;
  } catch (error) {
    console.log("Erro ao consultar banco de dados! ", error.message);
    return [];
  }
}

module.exports = fetch;
