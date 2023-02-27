const TeleBot = require("telebot");

const productTable = require("./modules/productTable.js");

const greetings = require("./modules/greetings.js");

const photo = require("./modules/photo.js");

const sales = require("./modules/sales.js");

async function Bot() {
  const bot = new TeleBot(process.env.TOKEN);

  await greetings(bot);

  await productTable(bot);

  await photo(bot);

  // await sales(bot);

  bot.start();
}

module.exports = Bot;
