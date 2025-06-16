// Importiert die Sidebar-Komponente für das Layout der Seite.
import Sidebar from "@/components/layout/sidebar";
// Importiert die Button-Komponente von Shadcn/ui.
import { Button } from "@/components/ui/button";
// Importiert den useState-Hook von React für die Zustandsverwaltung.
import { useState } from "react";
// Importiert jsPDF für die PDF-Generierung.
import jsPDF from "jspdf";
// Importiert jspdf-autotable für die Tabellenerstellung in PDFs.
import autoTable from "jspdf-autotable";

// Mock-Daten für die Analyse, die später durch echte API-Daten ersetzt werden könnten.
const mockAnalysis = [
  { id: 1, metric: "Traffic", value: 1234, unit: "MB", date: "2025-06-03" },
  { id: 2, metric: "Fehlermeldungen", value: 7, unit: "Stück", date: "2025-06-03" },
  { id: 3, metric: "Verbindungen", value: 42, unit: "Clients", date: "2025-06-03" },
];

/**
 * Exportiert die gegebenen Daten als CSV-Datei.
 * @param data Die zu exportierenden Daten (Array von Objekten).
 */
function exportCSV(data: any[]) {
  // Erstellt die Kopfzeile aus den Schlüsseln des ersten Datenobjekts, getrennt durch Semikolon.
  const header = Object.keys(data[0]).join(";");
  // Erstellt die Datenzeilen, indem die Werte jedes Objekts durch Semikolon getrennt werden.
  const rows = data.map(row => Object.values(row).join(";"));
  // Kombiniert Kopfzeile und Datenzeilen zu einem CSV-String.
  const csv = [header, ...rows].join("\n");
  // Erstellt ein Blob-Objekt aus dem CSV-String mit dem MIME-Typ für CSV.
  const blob = new Blob([csv], { type: "text/csv" });
  // Erstellt eine URL für das Blob-Objekt.
  const url = URL.createObjectURL(blob);
  // Erstellt ein temporäres Anker-Element.
  const a = document.createElement("a");
  // Setzt die href-Eigenschaft auf die Blob-URL.
  a.href = url;
  // Setzt den Dateinamen für den Download.
  a.download = "analyse.csv";
  // Simuliert einen Klick auf das Anker-Element, um den Download zu starten.
  a.click();
  // Gibt die Objekt-URL frei, um Speicherlecks zu vermeiden.
  URL.revokeObjectURL(url);
}

/**
 * Exportiert die gegebenen Daten als JSON-Datei.
 * @param data Die zu exportierenden Daten (Array von Objekten).
 */
function exportJSON(data: any[]) {
  // Erstellt ein Blob-Objekt aus dem JSON-String mit dem MIME-Typ für JSON.
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  // Erstellt eine URL für das Blob-Objekt.
  const url = URL.createObjectURL(blob);
  // Erstellt ein temporäres Anker-Element.
  const a = document.createElement("a");
  // Setzt die href-Eigenschaft auf die Blob-URL.
  a.href = url;
  // Setzt den Dateinamen für den Download.
  a.download = "analyse.json";
  // Simuliert einen Klick auf das Anker-Element, um den Download zu starten.
  a.click();
  // Gibt die Objekt-URL frei, um Speicherlecks zu vermeiden.
  URL.revokeObjectURL(url);
}

/**
 * Exportiert die gegebenen Daten als PDF-Datei.
 * @param data Die zu exportierenden Daten (Array von Objekten).
 */
function exportPDF(data: any[]) {
  const doc = new jsPDF(); // Erstellt ein neues jsPDF-Dokument.
  doc.text("Analyse-Daten", 14, 16); // Fügt einen Titel hinzu.
  autoTable(doc, {
    startY: 22, // Startposition der Tabelle.
    head: [Object.keys(data[0])], // Kopfzeile der Tabelle.
    body: data.map(row => Object.values(row)), // Datenzeilen der Tabelle.
    styles: { fontSize: 9 }, // Schriftgröße für den Tabelleninhalt.
    headStyles: { fillColor: [41, 128, 185] } // Hintergrundfarbe für die Kopfzeile.
  });
  doc.save("analyse.pdf"); // Speichert das generierte PDF.
}

/**
 * Die `Analyse`-Seite bietet eine Übersicht über Netzwerk-Analysedaten
 * und ermöglicht den Export dieser Daten in verschiedenen Formaten (CSV, PDF, JSON).
 */
export default function Analyse() {
  // Verwaltet das aktuell ausgewählte Exportformat (Standard: CSV).
  const [format, setFormat] = useState<"csv" | "pdf" | "json">("csv");

  /**
   * Behandelt den Export-Button-Klick.
   * Ruft die entsprechende Exportfunktion basierend auf dem ausgewählten Format auf.
   */
  const handleExport = () => {
    if (format === "csv") exportCSV(mockAnalysis);
    else if (format === "pdf") exportPDF(mockAnalysis);
    else if (format === "json") exportJSON(mockAnalysis);
  };

  return (
    // Hauptcontainer der Seite mit Flexbox-Layout und Theme-abhängigen Farben.
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Die Sidebar-Komponente für die Navigation. */}
      <Sidebar />
      {/* Hauptinhaltsbereich, der den Rest des Bildschirms einnimmt. */}
      <div className="flex-1 flex flex-col">
        {/* Header-Bereich der Analyse-Seite. */}
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800 px-8 py-5 shadow-sm">
          {/* Titel der Seite. */}
          <h1 className="text-3xl font-bold tracking-tight">Analyse</h1>
          {/* Beschreibung der Seite. */}
          <p className="text-base text-slate-600 dark:text-slate-400 mt-1">
            Netzwerk-Analyse und Auswertungen
          </p>
        </header>
        {/* Hauptinhalt der Seite, wo die Analysedaten und Exportoptionen angezeigt werden. */}
        <main className="flex-1 p-8 bg-slate-50 dark:bg-slate-950 transition-colors">
          <section className="max-w-6xl mx-auto">
            {/* Export-Optionen und Button. */}
            <div className="flex items-center gap-4 mb-6">
              {/* Label für das Auswahlfeld (nur für Screenreader sichtbar). */}
              <label htmlFor="export-format" className="sr-only">
                Exportformat wählen
              </label>
              {/* Auswahlfeld für das Exportformat. */}
              <select
                id="export-format"
                value={format}
                onChange={e => setFormat(e.target.value as any)} // Aktualisiert den Zustand bei Auswahländerung.
                className="border rounded px-2 py-1 bg-white dark:bg-slate-900 dark:border-slate-700"
              >
                <option value="csv">CSV</option>
                <option value="pdf">PDF</option>
                <option value="json">JSON</option>
              </select>
              {/* Button zum Starten des Exports. */}
              <Button onClick={handleExport}>Exportieren</Button>
            </div>
            {/* Tabelle zur Anzeige der Analysedaten. */}
            <div className="overflow-x-auto rounded shadow bg-white dark:bg-slate-900">
              <table className="min-w-full border text-sm">
                {/* Tabellenkopf mit Spaltenüberschriften. */}
                <thead>
                  <tr>
                    <th className="border px-2 py-1">ID</th>
                    <th className="border px-2 py-1">Metrik</th>
                    <th className="border px-2 py-1">Wert</th>
                    <th className="border px-2 py-1">Einheit</th>
                    <th className="border px-2 py-1">Datum</th>
                  </tr>
                </thead>
                {/* Tabellenkörper, der die Mock-Daten rendert. */}
                <tbody>
                  {/* Iteriert über die `mockAnalysis`-Daten und erstellt für jede Zeile eine Tabellenzeile. */}
                  {mockAnalysis.map(row => (
                    <tr key={row.id}> {/* `key` ist wichtig für die Performance und Stabilität von Listen in React. */}
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