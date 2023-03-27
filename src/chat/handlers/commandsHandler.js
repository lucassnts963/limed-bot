const greetingsRegex =
  /^\s*(ola|oi|olá|bom dia|boa tarde|boa noite|oi bot|ola bot|hey)\s*$/i;

function handle(entry) {
  if (entry.match(/\/start/)) {
    return "/start";
  }

  if (entry.match(greetingsRegex)) {
    return "/start";
  }

  if (entry.match(/\btabela\b/i)) {
    return "table";
  }

  if (entry.match(/\bfoto\b/i)) {
    return "photo";
  }

  if (entry.match(/\breceber\b/i)) {
    return "overdue";
  }

  return "default";
}

module.exports = handle;
