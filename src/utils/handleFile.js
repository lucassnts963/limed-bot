const fs = require("fs");

const tmpDir = "tmp";

function handle() {
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync("tmp");
  }

  const files = fs
    .readdirSync(tmpDir)
    .filter(filename => filename.includes(".pdf"));

  if (files.length > 1) {
    fs.unlinkSync(`${tmpDir}/${files[0]}`);
  }
}

function getLastFile() {
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync("tmp");
  }

  const files = fs
    .readdirSync(tmpDir)
    .filter(filename => filename.includes(".pdf"));

  if (files) {
    return `${tmpDir}/${files[0]}`;
  }
}

module.exports = { handle, getLastFile };
