const fs = require("fs");

async function sendProductPhoto(bot, chatId, code) {
  const imagesDIR = "images";

  if (!fs.existsSync(imagesDIR)) {
    fs.mkdirSync(imagesDIR);
  }

  const files = fs.readdirSync(imagesDIR);

  const fileName = files.find(file => file.includes(code));

  const path = `${imagesDIR}/${fileName}`;

  fs.readFile(path, (error, data) => {
    if (error) {
      console.error(error);
      bot.sendMessage(
        chatId,
        "Verifique se o código do produto está correto! Se estiver correto a imagem do produto ainda não está disponível."
      );
    } else {
      bot
        .sendPhoto(chatId, data, { fileName })
        .then(() => {
          console.log("Imagem enviada com sucesso.");
          return;
        })
        .catch(error => {
          console.error(error);
          bot.sendMessage(chatId, "Ocorreu um erro ao enviar a imagem.");
        });
    }
  });
}

module.exports = sendProductPhoto;
