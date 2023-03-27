const dayjs = require("dayjs");

const _ = require("lodash")

const { formatDate } = require("../utils/formatter");

const { finance } = require('../config/app.json')

function groupBy(result) {
  const byClient = []

  for (const key in result) {
    const total = _.sumBy(result[key], value => value.valor_original)
    const client = {
      text: `${result[key][0].id_cliente} - ${result[key][0].nome} - (R$ ${total.toFixed(2)})`,
      fontSize: 12,
      bold: true,
      alignment: "left",
      margin: [0, 10, 0, 10],
    }


    byClient.push(client)
    byClient.push(makeTable(result[key]))
  }

  return byClient
}

function makeTable(result) {
  return {
    style: "table",
    table: {
      headerRows: 1,
      widths: [
        "auto", "auto", "auto", "auto", "auto", "auto", "auto", "auto"],
      body: [
        [
          { text: "Cód", style: "tableHeader" },
          { text: "Parcela", style: "tableHeader" },
          { text: "Vencimento", style: "tableHeader" },
          { text: "Dias", style: "tableHeader" },
          { text: "Valor", style: "tableHeader" },
          { text: "Multa", style: "tableHeader" },
          { text: "Juros", style: "tableHeader" },
          { text: "Valor Corrigido", style: "tableHeader" },
        ],
        ...makeRows(result),
      ],
    },
    layout: {
      fillColor: function (i, node) {
        return i % 2 === 0 ? "#999999" : null;
      },
    },
  }
}

function makeRows(result) {

  const filtered = result.filter(value => {
    return true
  });

  return filtered.map(value => {
    const today = dayjs()
    const overdueDay = dayjs(value.vencimento).diff(today, 'days')
    const { penaltyRate, interestRatePerDay } = finance
   
    const penalty = (value.valor_original * penaltyRate / 100)
    const interestPerDay = (value.valor_original * interestRatePerDay / 100 ) * (-1)

    return [
      {
        text: value.id,
        style: "tableRow",
      },
      {
        text: value.parcela,
        style: "tableRow",
      },
      {
        text: formatDate(value.vencimento),
        style: "tableRow",
      },
      {
        text: `${overdueDay}`,
        style: "tableRow",
      },
      {
        text: `R$ ${value.valor_original.toFixed(2)}`,
        style: "tableRowLeft",
      },
      {
        text: `R$ ${penalty.toFixed(2)}`,
        style: "tableRowLeft",
      },
      {
        text: `R$ ${(interestPerDay * overdueDay).toFixed(2)}`,
        style: "tableRowLeft",
      },
      {
        text: `R$ ${(value.valor_original + interestPerDay * overdueDay).toFixed(2)}`,
        style: "tableRowLeft",
      },
    ]
  });
}

function buildDocDefinition(result) {
  const today = dayjs();

  const title = `Contas a Receber com mais de 40 dias`;
  const subtitle = `Atualizada em ${today.format(
    "DD/MM/YYYY [às] HH:mm"
  )}`

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
        margin: [0, 10, 0, 10],
      },
      {
        text: subtitle,
        fontSize: 12,
        bold: true,
        alignment: "center",
        margin: [0, 5, 0, 10],
      },
      ...groupBy(result)
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
        alignment: "right",
      },
    },
  };
}

module.exports = buildDocDefinition;
