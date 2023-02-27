async function greetings(bot) {
  const greetingsRegex =
    /^\s*(ola|oi|olá|bom dia|boa tarde|boa noite|oi bot|ola bot|hey)\s*$/i;

  bot.on([/\/start/, /\/hello/, /\bola\b\s*/i, greetingsRegex], msg => {
    return bot.sendMessage(
      msg.from.id,
      `Olá ${msg.from.first_name}!\n\n Posso lhe enviar uma tabela de produtos atualizada é só enviar alguma mensagem contendo o nome tabela.`
    );
  });
}

module.exports = greetings;
