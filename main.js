require("dotenv").config();

const bot = require("./src/chat/telegram.js");

async function main() {
  try {
    await bot();
  } catch (error) {
    console.error(error);
  }
}

main();
