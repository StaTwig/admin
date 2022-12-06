const excel = require("node-excel-export");
const PdfPrinter = require("pdfmake");
const fs = require("fs");
const { resolve } = require("path");

const fontDescriptors = {
  Roboto: {
    normal: resolve("fonts/Roboto-Regular.ttf"),
    bold: resolve("fonts/Roboto-Medium.ttf"),
    italics: resolve("fonts/Roboto-Italic.ttf"),
    bolditalics: resolve("fonts/Roboto-MediumItalic.ttf"),
  },
};
const printer = new PdfPrinter(fontDescriptors);

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

async function buildPdfReport(res, data, reportType, date) {
  const displayDate = date ? ` - ${month[new Date(date).getMonth()]}/${new Date(date).getFullYear()}` : "";
  const docDefinition = {
    content: [
      {
        text: `Network Report - ${reportType}${displayDate}`,
        fontSize: 20,
        style: "header",
      },
      {
        table: {
          body: data,
        },
      },
    ],
    styles: {
      header: {
        bold: true,
        margin: [0, 10, 10, 10],
      },
    },
  };

  const options = { fontLayoutCache: true };
  const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
  let tempFile;
  const pdfFile = pdfDoc.pipe(
    (tempFile = fs.createWriteStream("./output.pdf"))
  );
  const path = pdfFile.path;
  pdfDoc.end();
  tempFile.on("finish", async function () {
    return res.sendFile(resolve(path));
  });
  return;
}

function buildExcelReport(res, headerData, dataForExcel, reportType, date) {
  const displayDate = date ? ` - ${month[new Date(date).getMonth()]}/${new Date(date).getFullYear()}` : "";
  const styles = {
    headerDark: {
      fill: {
        fgColor: {
          rgb: "FF000000",
        },
      },
      font: {
        color: {
          rgb: "FFFFFFFF",
        },
        sz: 14,
        bold: true,
        underline: true,
      },
    },
    cellGreen: {
      fill: {
        fgColor: {
          rgb: "FF00FF00",
        },
      },
    },
  };

  let specification = {};

  for (const key of headerData) {
    specification[key.field] = {
      displayName: key.text,
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGr,
    };
  }

  const report = excel.buildExport([
    {
      name: `Network Report - ${reportType}${displayDate}`,
      specification: specification,
      data: dataForExcel,
    },
  ]);

  res.attachment("report.xlsx");
  return res.send(report);
}

module.exports = { buildPdfReport, buildExcelReport };
