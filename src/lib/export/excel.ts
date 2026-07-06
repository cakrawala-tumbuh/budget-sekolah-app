// Export Excel .xls zero-dependency: membangun satu tabel HTML per section
// lalu memaksa unduh dengan mime type Excel. Dibuka apa adanya oleh
// Excel/LibreOffice tanpa perlu library seperti SheetJS.

export interface ExcelSection {
  title: string;
  header: string[];
  rows: (string | number)[][];
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function cellHtml(value: string | number): string {
  if (typeof value === "number") {
    return `<td style="mso-number-format:'#,##0'; text-align:right;">${value}</td>`;
  }
  return `<td>${escapeHtml(value)}</td>`;
}

function sectionHtml(section: ExcelSection): string {
  const colCount = section.header.length || 1;
  const titleRow = `<tr><td colspan="${colCount}" style="background:#0f766e;color:#ffffff;font-weight:bold;font-size:14px;">${escapeHtml(
    section.title,
  )}</td></tr>`;
  const headerRow = `<tr>${section.header
    .map(
      (h) =>
        `<th style="background:#134e4a;color:#ffffff;font-weight:bold;border:1px solid #e2e8f0;">${escapeHtml(h)}</th>`,
    )
    .join("")}</tr>`;
  const dataRows = section.rows
    .map((row) => `<tr>${row.map(cellHtml).join("")}</tr>`)
    .join("");
  const spacerRow = `<tr><td colspan="${colCount}">&nbsp;</td></tr>`;
  return titleRow + headerRow + dataRows + spacerRow;
}

export function downloadXls(
  filename: string,
  sheetTitle: string,
  sections: ExcelSection[],
): void {
  const body = sections.map(sectionHtml).join("");
  const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<!--[if gte mso 9]>
<xml>
  <x:ExcelWorkbook>
    <x:ExcelWorksheets>
      <x:ExcelWorksheet>
        <x:Name>${escapeHtml(sheetTitle)}</x:Name>
        <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
      </x:ExcelWorksheet>
    </x:ExcelWorksheets>
  </x:ExcelWorkbook>
</xml>
<![endif]-->
</head>
<body>
<table border="1" cellspacing="0" cellpadding="4">
${body}
</table>
</body>
</html>`;

  const blob = new Blob([html], { type: "application/vnd.ms-excel" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.xls`;
  a.click();
  URL.revokeObjectURL(url);
}
