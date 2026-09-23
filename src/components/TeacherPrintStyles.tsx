export const TeacherPrintStyles = () => (
  <style>{`
    .print-only { display: none; }

    @media print {
      @page { size: A4; margin: 11mm; }

      body {
        background: #fff !important;
        color: #111827 !important;
        font-size: 10pt;
      }

      .no-print { display: none !important; }
      .print-only { display: block !important; }

      .print-sheet {
        max-width: 188mm;
        margin: 0 auto;
        color: #111827;
      }

      .print-kicker {
        text-transform: uppercase;
        letter-spacing: .12em;
        font-size: 8.5pt;
        font-weight: 800;
        color: #635BFF;
        margin-bottom: 2.5mm;
      }

      .print-sheet h1 {
        font-size: 19pt;
        margin: 0 0 2.5mm;
      }

      .print-sheet p { margin: 0 0 2.5mm; }

      .print-box,
      .print-message {
        border: 1.2px solid #CBD5E1;
        border-radius: 10px;
        padding: 3.5mm;
        margin: 3.5mm 0;
        background: #F8FAFC;
        break-inside: avoid;
      }

      .print-message {
        background: #F1F5F9;
      }

      .print-sms {
        margin-top: 2.5mm;
        border-radius: 9px;
        padding: 3mm;
        background: #E2E8F0;
      }

      .print-sms-from {
        font-size: 8.5pt;
        font-weight: 800;
        color: #64748B;
        margin-bottom: 1.5mm;
      }

      .print-sms-link {
        margin-top: 1.5mm;
        color: #2563EB;
        font-weight: 700;
        text-decoration: underline;
      }

      .print-options {
        display: grid;
        gap: 2mm;
        margin: 3.5mm 0 4.5mm;
      }

      .print-option {
        display: flex;
        align-items: center;
        gap: 3mm;
        border: 1px solid #CBD5E1;
        border-radius: 9px;
        padding: 2.5mm;
        break-inside: avoid;
      }

      .print-letter {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 8mm;
        height: 8mm;
        border-radius: 7px;
        background: #EDE9FE;
        color: #5B21B6;
        font-weight: 800;
        flex: 0 0 auto;
      }

      .print-question {
        margin: 4mm 0;
        break-inside: avoid;
      }

      .print-lines {
        height: 12mm;
        margin-top: 1.5mm;
        background: repeating-linear-gradient(
          to bottom,
          transparent 0,
          transparent 5.5mm,
          #CBD5E1 5.5mm,
          #CBD5E1 5.8mm
        );
      }

      .print-footer {
        display: flex;
        gap: 2.5mm;
        align-items: flex-start;
        margin-top: 4mm;
        padding-top: 3mm;
        border-top: 1px solid #CBD5E1;
        font-size: 9pt;
        color: #475569;
        break-inside: avoid;
      }
    }
  `}</style>
);
