import { jsPDF } from "jspdf";
import { formatDate, sanitizeFilePart } from "@/lib/utils";

export function createDoc(title: string) {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  doc.setProperties({
    title,
    creator: "DocuGen"
  });
  return doc;
}

export function addHeader(doc: jsPDF, documentTitle: string) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor("#185FA5");
  doc.text("DocuGen", 48, 48);
  doc.setFontSize(18);
  doc.setTextColor("#222222");
  doc.text(documentTitle, 48, 78);
  doc.setDrawColor("#D9E2EC");
  doc.line(48, 94, 564, 94);
}

export function addField(
  doc: jsPDF,
  label: string,
  value: string | number | undefined,
  y: number
) {
  const safeValue = value === undefined || value === "" ? "Not provided" : String(value);
  doc.setFontSize(10);
  doc.setTextColor("#222222");
  doc.setFont("helvetica", "bold");
  doc.text(label, 48, y);
  doc.setFont("helvetica", "normal");
  const lines = doc.splitTextToSize(safeValue, 340);
  doc.text(lines, 210, y);
  return y + Math.max(lines.length, 1) * 14 + 8;
}

export function addSectionTitle(doc: jsPDF, title: string, y: number) {
  const nextY = ensureSpace(doc, y, 34);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor("#185FA5");
  doc.text(title, 48, nextY);
  return nextY + 20;
}

export function addParagraph(doc: jsPDF, text: string, y: number, width = 516) {
  const nextY = ensureSpace(doc, y, 48);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor("#222222");
  const lines = doc.splitTextToSize(text, width);
  doc.text(lines, 48, nextY);
  return nextY + lines.length * 14 + 10;
}

export function addSignatureLines(doc: jsPDF, labels: string[], y: number) {
  let nextY = ensureSpace(doc, y, 78);
  labels.forEach((label, index) => {
    const x = index === 0 ? 48 : 320;
    doc.setDrawColor("#666666");
    doc.line(x, nextY + 32, x + 210, nextY + 32);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor("#666666");
    doc.text(label, x, nextY + 48);
  });
  return nextY + 68;
}

export function ensureSpace(doc: jsPDF, y: number, needed: number) {
  if (y + needed < 740) return y;
  doc.addPage();
  return 48;
}

export function dateForFilename(value: string) {
  return sanitizeFilePart(formatDate(value).replace(/,/g, ""));
}
