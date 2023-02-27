const sendProductPhoto = require("../reports/productPhoto.js");

const pattern = /\d+/g;

async function productTable(bot) {
  bot.on(/\bfoto\b/i, async msg => {
    const chatId = msg.chat.id;
    const text = msg.text;

    const match = text.match(pattern);

    if (match) {
      const code = match[0];
      await sendProductPhoto(bot, chatId, code);
    } else {
      await bot.sendMessage(
        chatId,
        "Não entendi qual o produto que você deseja a foto, me envie uma mensagem qualquer que contenha o código do produto e a palavra foto."
      );
    }
  });
}

module.exports = productTable;
