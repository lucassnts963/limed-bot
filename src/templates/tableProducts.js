const dayjs = require("dayjs");

function makeRows(result) {
  const filtered = result.filter(value => {
    if (
      value.quantidade >= 0 ||
      String(value.preco_venda).trim() === "" ||
      !value.fabricante ||
      !value.nome
    ) {
      return true;
    }
  });

  return filtered.map(value => [
    {
      text: value.id,
      style: "tableRow",
    },
    {
      text: value.codigo_barras,
      style: "tableRow",
    },
    {
      text: value.nome,
      style: "tableRowLeft",
    },
    {
      text: value.fabricante,
      style: "tableRow",
    },
    {
      text: `R$ ${value.preco_venda.toFixed(2)}`,
      style: "tableRowLeft",
    },
  ]);
}

function buildDocDefinition(result) {
  const today = dayjs();

  const title = `Tabela de Produtos - Atualizada em ${today.format(
    "DD/MM/YYYY [às] HH:mm"
  )}`;

  return {
    pageSize: "A4",
    pageMargins: [10, 10, 10, 10],
    content: [
      {
        image: "src/assets/logo.jpg",
        fit: [150, 150],
        alignment: "center",
      },
      {
        text: title,
        fontSize: 18,
        bold: true,
        alignment: "center",
        margin: [0, 20, 0, 10],
      },
      {
        style: "table",
        table: {
          headerRows: 1,
          widths: ["auto", "auto", 320, 75, "auto"],
          body: [
            [
              { text: "Cód", style: "tableHeader" },
              { text: "Barras", style: "tableHeader" },
              { text: "Produto", style: "tableHeader" },
              { text: "Fabricante", style: "tableHeader" },
              { text: "Preço", style: "tableHeader" },
            ],
            ...makeRows(result),
          ],
        },
        layout: {
          fillColor: function (i, node) {
            return i % 2 === 0 ? "#999999" : null;
          },
        },
      },
    ],
    styles: {
      table: {
        margin: [0, 10, 0, 10],
        fontSize: 10,
        alignment: "center",
        color: "#333",
        fillOpacity: 0.9,
      },
      tableHeader: {
        bold: true,
        fontSize: 10,
        color: "white",
        fillColor: "#006400",
        alignment: "center",
        margin: [0, 0, 0, 0],
      },
      tableRow: {
        margin: [0, 0, 0, 0],
        fontSize: 8,
        color: "black",
      },
      tableRowLeft: {
        margin: [0, 0, 0, 0],
        fontSize: 8,
        color: "black",
        alignment: "left",
      },
    },
  };
}

module.exports = buildDocDefinition;
