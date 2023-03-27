const fs = require("fs");

const buildDocDefinitions = require("../../templates/tableOverdue.js");
const fetch = require("../../database/fetchOverdue.js");
const makePdf = require("../../scripts/makePdf.js");

const { handle, getLastFile } = require("../../utils/handleFile.js");

async function sendOverdueTable(bot, chatId) {
  const tmpDir = 'tmp/overdueOverdue'
  try {
    const result = await fetch();
    if (result.length === 0) {
      throw new Error("Error ao Consultar Banco de dados!");
    }
    const docDefinition = buildDocDefinitions(result);
    const path = await makePdf(docDefinition, 'tmp/overdueOverdue');
    const aux = path.split('/')

    const fileName = aux[aux.length - 1];

    // Leitura do arquivo PDF e envio para o usuário
    fs.readFile(path, (error, data) => {
      if (error) {
        console.error('here', error);
        bot.sendMessage(chatId, "Ocorreu um erro ao ler o arquivo PDF.");
      } else {
        bot
          .sendDocument(chatId, data, { fileName })
          .then(() => {
            console.log("PDF enviado com sucesso.");
            return;
          })
          .catch(error => {
            console.log(error);
            bot.sendMessage(chatId, "Ocorreu um erro ao enviar o arquivo PDF.");
          });
      }
    });

    handle(tmpDir);
  } catch (error) {
    bot.sendMessage(
      chatId,
      "Error ao enviar a tabela atualizada de Produtos! Segue a última tabela disponível!",
      error
    );
    const path = getLastFile(tmpDir);

    const fileName = path.split("/")[1];

    fs.readFile(path, (error, data) => {
      if (error) {
        console.error(error);
        bot.sendMessage(chatId, "Ocorreu um erro ao ler o arquivo PDF.");
      } else {
        bot
          .sendDocument(chatId, data, {
            fileName,
            file_options: { encoding: "UTF-8" },
          })
          .then(() => {
            console.log("PDF enviado com sucesso.");
            return;
          })
          .catch(error => {
            console.error(error);
            bot.sendMessage(chatId, "Ocorreu um erro ao enviar o arquivo PDF.");
          });
      }
    });
  }
}

module.exports = sendOverdueTable;
