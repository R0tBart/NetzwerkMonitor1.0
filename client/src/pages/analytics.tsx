import Sidebar from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const mockAnalysis = [
  { id: 1, metric: "Traffic", value: 1234, unit: "MB", date: "2025-06-03" },
  { id: 2, metric: "Fehlermeldungen", value: 7, unit: "Stück", date: "2025-06-03" },
  { id: 3, metric: "Verbindungen", value: 42, unit: "Clients", date: "2025-06-03" },
];

function exportCSV(data: any[]) {
  const header = Object.keys(data[0]).join(";");
  const rows = data.map(row => Object.values(row).join(";"));
  const csv = [header, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "analyse.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function exportJSON(data: any[]) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "analyse.json";
  a.click();
  URL.revokeObjectURL(url);
}

function exportPDF(data: any[]) {
  const doc = new jsPDF();
  doc.text("Analyse-Daten", 14, 16);
  autoTable(doc, {
    startY: 22,
    head: [Object.keys(data[0])],
    body: data.map(row => Object.values(row)),
    styles: { fontSize: 9 },
    headStyles: { fillColor: [41, 128, 185] }
  });
  doc.save("analyse.pdf");
}

export default function Analyse() {
  const [format, setFormat] = useState<"csv" | "pdf" | "json">("csv");

  const handleExport = () => {
    if (format === "csv") exportCSV(mockAnalysis);
    else if (format === "pdf") exportPDF(mockAnalysis);
    else if (format === "json") exportJSON(mockAnalysis);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800 px-8 py-5 shadow-sm">
          <h1 className="text-3xl font-bold tracking-tight">Analyse</h1>
          <p className="text-base text-slate-600 dark:text-slate-400 mt-1">
            Netzwerk-Analyse und Auswertungen
          </p>
        </header>
        <main className="flex-1 p-8 bg-slate-50 dark:bg-slate-950 transition-colors">
          <section className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <label htmlFor="export-format" className="sr-only">
                Exportformat wählen
              </label>
              <select
                id="export-format"
                value={format}
                onChange={e => setFormat(e.target.value as any)}
                className="border rounded px-2 py-1 bg-white dark:bg-slate-900 dark:border-slate-700"
              >
                <option value="csv">CSV</option>
                <option value="pdf">PDF</option>
                <option value="json">JSON</option>
              </select>
              <Button onClick={handleExport}>Exportieren</Button>
            </div>
            <div className="overflow-x-auto rounded shadow bg-white dark:bg-slate-900">
              <table className="min-w-full border text-sm">
                <thead>
                  <tr>
                    <th className="border px-2 py-1">ID</th>
                    <th className="border px-2 py-1">Metrik</th>
                    <th className="border px-2 py-1">Wert</th>
                    <th className="border px-2 py-1">Einheit</th>
                    <th className="border px-2 py-1">Datum</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAnalysis.map(row => (
                    <tr key={row.id}>
                      <td className="border px-2 py-1">{row.id}</td>
                      <td className="border px-2 py-1">{row.metric}</td>
                      <td className="border px-2 py-1">{row.value}</td>
                      <td className="border px-2 py-1">{row.unit}</td>
                      <td className="border px-2 py-1">{row.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}