const sendOverdueTable = require('../../chat/reports/overdueReport.js')

async function overdue(bot, msg) {
  const chatId = msg.chat.id

  await sendOverdueTable(bot, chatId)
}

module.exports = overdue