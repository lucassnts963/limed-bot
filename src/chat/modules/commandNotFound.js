async function commandNotFound(bot, msg) {
  const chatId = msg.chat.id;

  await bot.sendMessage(
    chatId,
    "Não entendi seu comando! \n\n Tente um dos comandos: \n\n - Para consultar uma tabela atualizada digite tabela (ex. tabela) \n - Para a uma foto do produto digite a palavra foto seguido do código do produto (Ex. foto 107103)"
  );
}

module.exports = commandNotFound;
