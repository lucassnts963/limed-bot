const PdfPrinter = require("pdfmake/src/printer");
const fs = require("fs");
const dayjs = require("dayjs");
const path = require("path");

async function makePdf(docDefinition, tmpDir = 'tmp') {
  try {
    const fonts = {
      Roboto: {
        normal: "src/fonts/Roboto-Regular.ttf",
        bold: "src/fonts/Roboto-Medium.ttf",
        italics: "src/fonts/Roboto-Italic.ttf",
        bolditalics: "src/fonts/Roboto-MediumItalic.ttf",
      },
    };

    const printer = new PdfPrinter(fonts);

    const today = dayjs();

    const filename = `${today.format("DDMMYYYYHHmmss")}.pdf`;
    const pathFile = path.join(tmpDir, filename);

    let pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream(pathFile));
    pdfDoc.end();

    return new Promise((resolve, reject) => {
      pdfDoc.on("end", () => {
        resolve(pathFile);
      });
    });
  } catch (error) {
    console.log("Erro ao criar documento pdf!", error.message);
    console.log(error)
  }
}

module.exports = makePdf;
