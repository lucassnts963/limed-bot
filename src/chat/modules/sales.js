const sumAmountBySalesman = require("../reports/salesValueReport.js");

async function sendSalesAmountBySalesman(bot) {
  bot.on(/\bvendas\b/i, async msg => {
    const chatId = msg.chat.id;
    const text = msg.text;

    await sumAmountBySalesman(bot, "paulo");
  });
}

module.exports = sendSalesAmountBySalesman;
