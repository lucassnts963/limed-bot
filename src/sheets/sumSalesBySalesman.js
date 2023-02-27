const { GoogleSpreadsheet } = require("google-spreadsheet");
const credentials = require("../../google_api_crendentials.json");

async function sumSalesBySalesman(salesman) {
  // Initialize the sheet - doc ID is the long id in the sheets URL
  const doc = new GoogleSpreadsheet(
    "1zmjlEXC_b1wL_1-HQXW2f2_b3FF6QBmGKnDxofEaSKE"
  );

  try {
    await doc.useServiceAccountAuth(credentials);

    await doc.loadInfo();

    const sheet = doc.sheetsByTitle["ENTRADA"];

    const rows = await sheet.getRows();

    const values = rows.map(row => {
      const pattern = /R\$\s*(\d{1,3}(\.\d{3})*,\d{2})/;
      const vendedor = String(row["VENDEDOR"]).toLowerCase();
      const status = String(row["SITUAÇÃO"]).toLowerCase();
      const text = row["VALOR FATURADO"];
      const match = text.match(pattern);
      if (
        match &&
        vendedor.includes(String(salesman).toLowerCase()) &&
        !status.includes("recusado")
      ) {
        const numbers = match[1].replace(".", "").replace(",", ".");
        return parseFloat(numbers);
      }
      return 0;
    });

    const sum = values.reduce((total, num) => total + num, 0);

    return sum;
  } catch (error) {
    console.log(error);
    return 0;
  }

  // Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
}

module.exports = sumSalesBySalesman;
