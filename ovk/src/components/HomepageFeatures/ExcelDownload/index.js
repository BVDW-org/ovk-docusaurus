import React from "react";
import * as XLSX from "xlsx";

const ExcelDownloadButton = () => {
  const downloadExcel = async () => {
    const res = await fetch(
      "https://github.com/BVDW-org/ovk-identifiersupport/blob/main/ID-Support_OVK-Vermarkter/OVK-IdentifierSupport.md"
    );
    const text = await res.text();

    // Markdown in Tabellenstruktur parsen
    const rows = text
      .split("\n")
      .filter((line) => line.includes("|"))
      .map((line) =>
        line
          .split("|")
          .map((cell) => cell.trim())
          .filter((_, i, arr) => i !== 0 && i !== arr.length - 1)
      );

    const [header, ...body] = rows;
    const worksheet = XLSX.utils.aoa_to_sheet([header, ...body]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tabelle");

    XLSX.writeFile(workbook, "OVK-IdentifierSupport.xlsx");
  };

  return (
    <button
      onClick={downloadExcel}
      style={{
        padding: "10px 20px",
        backgroundColor: "#0070f3",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "20px",
      }}
    >
      📥 Excel herunterladen
    </button>
  );
};

export default ExcelDownloadButton;
