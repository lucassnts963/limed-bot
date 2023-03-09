const TeleBot = require("telebot");

const handlerCommands = require("./handlers/commandsHandler.js");

const commandNotFound = require("./modules/commandNotFound.js");

const productTable = require("./modules/productTable.js");

const greetings = require("./modules/greetings.js");

const photo = require("./modules/photo.js");

const sales = require("./modules/sales.js");

async function Bot() {
  const bot = new TeleBot(process.env.TOKEN);

  bot.on("text", async msg => {
    const { text } = msg;

    const intent = handlerCommands(text);

    switch (intent) {
      case "/start":
        await greetings(bot, msg);
        break;
      case "table":
        await productTable(bot, msg);
        break;
      case "photo":
        await photo(bot, msg);
        break;
      default:
        await commandNotFound(bot, msg);
    }
  });

  bot.start();
}

module.exports = Bot;
