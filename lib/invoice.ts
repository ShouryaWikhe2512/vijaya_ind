import nodemailer from "nodemailer";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { InvoiceDocument } from "@/models/Invoice";

type BuyerInfo = {
  name: string;
  email: string;
  companyName?: string;
  address?: string;
  gstin?: string;
};

function toSafeNumber(value: unknown, fallback = 0) {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toSafeText(value: unknown, fallback = "-") {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback;
}

function formatCurrency(value: number) {
  const amount = toSafeNumber(value, 0);
  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);

  // Built-in PDFKit fonts (e.g., Helvetica) do not reliably support the rupee symbol.
  // Replace it with ASCII-safe text to avoid "cannot encode" runtime failures.
  return formatted.replace(/\u20B9/g, "INR ");
}

export function generateInvoicePdf(invoice: InvoiceDocument, buyer: BuyerInfo): Promise<Buffer> {
  return (async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const safeItems = Array.isArray(invoice.items) ? invoice.items : [];
    const safeGst = {
      cgst: toSafeNumber(invoice.gstBreakup?.cgst, 0),
      sgst: toSafeNumber(invoice.gstBreakup?.sgst, 0),
      igst: toSafeNumber(invoice.gstBreakup?.igst, 0),
    };
    const parsedDate = invoice.createdAt ? new Date(invoice.createdAt) : new Date();
    const safeDate = Number.isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
    const draw = (text: string, x: number, y: number, size = 10, bold = false) => {
      page.drawText(text, {
        x,
        y,
        size,
        font: bold ? boldFont : font,
        color: rgb(0.1, 0.1, 0.1),
      });
    };

    draw("VIJAYA INDUSTRIES", 200, 800, 18, true);
    draw("GST No. 27AQXPC1055E1ZW", 215, 784, 10);
    draw("TAX INVOICE", 245, 760, 14, true);

    draw("Invoice Details:", 50, 728, 10, true);
    draw(`Invoice No: ${toSafeText(invoice.invoiceNumber, "N/A")}`, 50, 712);
    draw(`Date: ${safeDate.toLocaleDateString("en-IN")}`, 50, 698);
    draw(`Order ID: ${toSafeText(invoice.orderId, "-")}`, 50, 684);

    draw("Billed To:", 330, 728, 10, true);
    draw(`${toSafeText(buyer.companyName, toSafeText(buyer.name, "Buyer"))}`, 330, 712);
    draw(`${toSafeText(buyer.address, "-")}`, 330, 698);
    draw(`GSTIN: ${toSafeText(buyer.gstin, "Unregistered")}`, 330, 684);
    draw(`Email: ${toSafeText(buyer.email, "-")}`, 330, 670);

    page.drawLine({ start: { x: 50, y: 648 }, end: { x: 545, y: 648 }, thickness: 1 });
    draw("S.No", 50, 634, 10, true);
    draw("Description (SKU)", 95, 634, 10, true);
    draw("Qty", 360, 634, 10, true);
    draw("Unit Price", 410, 634, 10, true);
    draw("Total", 500, 634, 10, true);
    page.drawLine({ start: { x: 50, y: 626 }, end: { x: 545, y: 626 }, thickness: 1 });

    let rowY = 610;
    safeItems.slice(0, 18).forEach((item, index) => {
      const quantity = toSafeNumber(item.quantity, 0);
      const price = toSafeNumber(item.price, 0);
      const lineTotal = toSafeNumber(item.lineTotal, 0);
      draw(`${index + 1}`, 50, rowY);
      draw(`${toSafeText(item.name, "Item")} (${toSafeText(item.sku, "-")})`, 95, rowY);
      draw(`${quantity}`, 360, rowY);
      draw(`${formatCurrency(price)}`, 410, rowY);
      draw(`${formatCurrency(lineTotal)}`, 500, rowY);
      rowY -= 18;
    });

    page.drawLine({ start: { x: 50, y: rowY - 6 }, end: { x: 545, y: rowY - 6 }, thickness: 1 });

    const taxY = rowY - 28;
    if (safeGst.cgst > 0) {
      draw(`CGST: ${formatCurrency(safeGst.cgst)}`, 390, taxY);
      draw(`SGST: ${formatCurrency(safeGst.sgst)}`, 390, taxY - 16);
    } else {
      draw(`IGST: ${formatCurrency(safeGst.igst)}`, 390, taxY);
    }
    draw(`Grand Total: ${formatCurrency(toSafeNumber(invoice.totalAmount, 0))}`, 350, taxY - 36, 12, true);

    draw("Thank you for your business!", 220, 100, 10);
    draw("Authorized Signatory: ___________________", 340, 70, 10);

    const bytes = await pdfDoc.save();
    return Buffer.from(bytes);
  })();
}

export function generateFallbackInvoicePdf(invoice: InvoiceDocument, buyer: BuyerInfo): Promise<Buffer> {
  return generateInvoicePdf(invoice, buyer);
}

export async function sendInvoiceEmail(params: {
  to: string;
  subject: string;
  pdf: Buffer;
  filename: string;
}) {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM ?? user;

  if (!host || !port || !user || !pass || !from) {
    return { sent: false, message: "SMTP is not configured." };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to: params.to,
    subject: params.subject,
    text: "Please find your invoice attached.",
    attachments: [
      {
        filename: params.filename,
        content: params.pdf,
      },
    ],
  });

  return { sent: true, message: "Invoice emailed successfully." };
}
