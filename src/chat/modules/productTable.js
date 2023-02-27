const sendProductTable = require("../reports/productTableReport.js");

async function productTable(bot) {
  bot.on(/\btabela\b/i, async msg => {
    const chatId = msg.chat.id;

    await sendProductTable(bot, chatId);
  });
}

module.exports = productTable;
