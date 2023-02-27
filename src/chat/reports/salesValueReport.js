const sumSalesBySalesman = require("../../sheets/sumSalesBySalesman.js");

const { formatCurrency } = require("../../utils/formatter.js");

async function sendSalesAmount(bot, chatId, salesman) {
  try {
    const salesAmount = await sumSalesBySalesman(salesman);
    bot.sendMessage(
      chatId,
      `A sua venda faturada até o momento foi de ${formatCurrency(salesAmount)}`
    );
  } catch (error) {
    console.log("Erro ao acessar a planilha!");
    bot.sendMessage(
      chatId,
      "Serviço temporariamente indisponível! Se você está recebendo essa mensagem por favor informe o administrador"
    );
  }
}

module.exports = sendSalesAmount;
