const dayjs = require("dayjs");

function formatCurrency(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatDate(value) {
  return dayjs(value).format('DD/MM/YYYY')
}

module.exports = {
  formatCurrency,
  formatDate
};
