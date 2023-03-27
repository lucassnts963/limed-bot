const fetch = require('./src/database/fetchOverdue.js')
const buildDocDefinition = require('./src/templates/tableOverdue.js')
const makePdf = require("./src/scripts/makePdf.js");

async function test() {
  const result = await fetch()

  const definition = buildDocDefinition(result)


  await makePdf(definition, 'tmp/overdueOverdue')
}

test()

