async function greetings(bot, msg) {
  await bot.sendMessage(
    msg.from.id,
    `Olá ${msg.from.first_name}!\n\n Posso lhe enviar uma tabela de produtos atualizada é só enviar alguma mensagem contendo o nome tabela.`
  );
}

module.exports = greetings;
