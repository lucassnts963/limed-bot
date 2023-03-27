const fs = require("fs");

function handle(tmpDir = 'tmp') {
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
  }

  const files = fs
    .readdirSync(tmpDir)
    .filter(filename => filename.includes(".pdf"));

  if (files.length > 1) {
    fs.unlinkSync(`${tmpDir}/${files[0]}`);
  }
}

function getLastFile(tmpDir = 'tmp') {
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
  }

  const files = fs
    .readdirSync(tmpDir)
    .filter(filename => filename.includes(".pdf"));

  if (files) {
    return `${tmpDir}/${files[0]}`;
  }
}

module.exports = { handle, getLastFile };
