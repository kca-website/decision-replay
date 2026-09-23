export const TeacherPrintStyles = () => (
  <style>{`
    .print-only { display: none; }

    @media print {
      @page { size: A4; margin: 14mm; }

      body {
        background: #fff !important;
        color: #111827 !important;
        font-size: 11pt;
      }

      .no-print { display: none !important; }
      .print-only { display: block !important; }

      .print-sheet {
        max-width: 180mm;
        margin: 0 auto;
        color: #111827;
      }

      .print-kicker {
        text-transform: uppercase;
        letter-spacing: .12em;
        font-size: 9pt;
        font-weight: 800;
        color: #635BFF;
        margin-bottom: 4mm;
      }

      .print-sheet h1 {
        font-size: 22pt;
        margin: 0 0 4mm;
      }

      .print-sheet p { margin: 0 0 4mm; }

      .print-box {
        border: 1.5px solid #CBD5E1;
        border-radius: 12px;
        padding: 5mm;
        margin: 5mm 0;
        background: #F8FAFC;
      }

      .print-options {
        display: grid;
        gap: 3mm;
        margin: 5mm 0 7mm;
      }

      .print-option {
        display: flex;
        align-items: center;
        gap: 4mm;
        border: 1px solid #CBD5E1;
        border-radius: 10px;
        padding: 3.5mm;
      }

      .print-letter {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 9mm;
        height: 9mm;
        border-radius: 8px;
        background: #EDE9FE;
        color: #5B21B6;
        font-weight: 800;
      }

      .print-question { margin: 6mm 0; }

      .print-lines {
        height: 18mm;
        margin-top: 2.5mm;
        background: repeating-linear-gradient(
          to bottom,
          transparent 0,
          transparent 7mm,
          #CBD5E1 7mm,
          #CBD5E1 7.3mm
        );
      }

      .print-footer {
        display: flex;
        gap: 3mm;
        align-items: flex-start;
        margin-top: 7mm;
        padding-top: 4mm;
        border-top: 1px solid #CBD5E1;
        font-size: 9.5pt;
        color: #475569;
      }
    }
  `}</style>
);
