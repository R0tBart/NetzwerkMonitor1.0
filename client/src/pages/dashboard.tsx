import { useEffect } from "react";
// Importiert Layout-Komponenten
import Sidebar from "@/components/layout/sidebar";
// Importiert Dashboard-spezifische Komponenten
import MetricsOverview from "@/components/dashboard/metrics-overview";
import BandwidthChart from "@/components/dashboard/bandwidth-chart";
import DeviceStatusChart from "@/components/dashboard/device-status-chart";
import DeviceTable from "@/components/dashboard/device-table";
// Importiert UI-Komponenten von Shadcn/ui
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// Importiert Icons von lucide-react
import { Search, Download, Circle } from "lucide-react";
// Importiert Hooks von React Query für Datenabruf und -manipulation
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// Importiert die Hilfsfunktion für API-Anfragen
import { apiRequest } from "@/lib/queryClient";
// Importiert jsPDF für die PDF-Generierung
import jsPDF from "jspdf";
// Importiert jspdf-autotable für die Tabellenerstellung in PDFs
import autoTable from "jspdf-autotable";

/**
 * Die Dashboard-Seite zeigt eine Übersicht über Netzwerkmetriken, Gerätestatus und Bandbreitennutzung.
 * Sie ermöglicht auch den Export dieser Daten als PDF.
 */
export default function Dashboard() {
  // Initialisiert den QueryClient, um Caching und Invalidierung von Daten zu verwalten.
  const queryClient = useQueryClient();

  // Datenabrufe für verschiedene Dashboard-Sektionen mittels React Query.
  // `useQuery` wird verwendet, um Daten vom Backend abzurufen und zu cachen.
  // Geräte und Metriken laden
  // Abruf der Gerätedaten von der API.
  const { data: devices = [] } = useQuery<any[]>({ // `any[]` wird hier als Platzhalter verwendet, sollte durch ein spezifisches Typ-Array ersetzt werden.
    queryKey: ["/api/devices"], // Eindeutiger Schlüssel für das Caching der Abfrageergebnisse.
  });
  // Abruf der Bandbreitenmetriken von der API.
  const { data: metrics = [] } = useQuery<any[]>({ // `any[]` wird hier als Platzhalter verwendet, sollte durch ein spezifisches Typ-Array ersetzt werden.
    queryKey: ["/api/bandwidth-metrics"],
  });
  // Abruf der Daten für das Bandbreiten-Chart.
  const { data: bandwidthChart = [] } = useQuery<any[]>({ // `any[]` wird hier als Platzhalter verwendet, sollte durch ein spezifisches Typ-Array ersetzt werden.
    queryKey: ["/api/bandwidth-metrics/chart"],
  });
  // Abruf der Daten für das Gerätestatus-Chart.
  const { data: deviceStatusChart = [] } = useQuery<any[]>({ // `any[]` wird hier als Platzhalter verwendet, sollte durch ein spezifisches Typ-Array ersetzt werden.
    queryKey: ["/api/device-status/chart"],
  });

  // `useMutation` Hook zum Initialisieren von Mock-Daten im Backend.
  const initMockData = useMutation({
    mutationFn: () => apiRequest("POST", "/api/generate-mock-data"), // Die Funktion, die die API-Anfrage ausführt.
    onSuccess: () => { // Callback, der bei erfolgreicher Mutation ausgeführt wird.
      // Invalidiert spezifische Caches, um die UI nach dem Generieren der Mock-Daten zu aktualisieren.
      queryClient.invalidateQueries({ queryKey: ["/api/bandwidth-metrics"] });
      queryClient.invalidateQueries({ queryKey: ["/api/system-metrics/history"] });
      queryClient.invalidateQueries({ queryKey: ["/api/devices"] });
      queryClient.invalidateQueries({ queryKey: ["/api/bandwidth-metrics/chart"] });
      queryClient.invalidateQueries({ queryKey: ["/api/device-status/chart"] });
    },
  });

  // `useEffect` Hook, der beim ersten Rendern der Komponente ausgeführt wird.
  useEffect(() => {
    initMockData.mutate(); // Startet die Mutation zum Generieren der Mock-Daten.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Leeres Abhängigkeits-Array bedeutet, dass dieser Effekt nur einmal beim Mounten ausgeführt wird.

  /**
   * `handleExport` Funktion zum Exportieren aller angezeigten Dashboard-Daten als PDF.
   * Verwendet `jspdf` und `jspdf-autotable` zur Erstellung formatierter Tabellen im PDF.
   */
  const handleExport = async () => {
    try {
      const doc = new jsPDF(); // Erstellt ein neues jsPDF-Dokument.
      let y = 16; // Startposition für den Inhalt auf der Y-Achse.

      // Titel des Dokuments.
      doc.setFontSize(18);
      doc.text("Dashboard Übersicht", 14, y);
      y += 10;

      // Fügt Metriken-Tabelle hinzu, falls Daten vorhanden sind.
      if (metrics.length > 0) {
        doc.setFontSize(14);
        doc.text("Metriken", 14, y);
        y += 4;
        autoTable(doc, {
          startY: y, // Startposition der Tabelle.
          head: [Object.keys(metrics[0])], // Kopfzeile der Tabelle aus den Schlüsseln des ersten Metrik-Objekts.
          body: metrics.map((m: any) => Object.values(m)), // Datenzeilen aus den Werten der Metrik-Objekte.
          styles: { fontSize: 9 }, // Schriftgröße für den Tabelleninhalt.
          headStyles: { fillColor: [41, 128, 185] } // Hintergrundfarbe für die Kopfzeile.
        });
        y = (doc as any).lastAutoTable.finalY + 10; // Aktualisiert die Y-Position nach der Tabelle.
      }

      // Fügt Bandbreiten-Chart-Daten-Tabelle hinzu.
      if (bandwidthChart.length > 0) {
        doc.setFontSize(14);
        doc.text("Bandbreiten-Verlauf", 14, y);
        y += 4;
        autoTable(doc, {
          startY: y,
          head: [Object.keys(bandwidthChart[0])],
          body: bandwidthChart.map((row: any) => Object.values(row)),
          styles: { fontSize: 9 },
          headStyles: { fillColor: [52, 152, 219] }
        });
        y = (doc as any).lastAutoTable.finalY + 10;
      }

      // Fügt Gerätestatus-Chart-Daten-Tabelle hinzu.
      if (deviceStatusChart.length > 0) {
        doc.setFontSize(14);
        doc.text("Gerätestatus Übersicht", 14, y);
        y += 4;
        autoTable(doc, {
          startY: y,
          head: [Object.keys(deviceStatusChart[0])],
          body: deviceStatusChart.map((row: any) => Object.values(row)),
          styles: { fontSize: 9 },
          headStyles: { fillColor: [39, 174, 96] }
        });
        y = (doc as any).lastAutoTable.finalY + 10;
      }

      // Fügt Geräte-Tabelle hinzu.
      if (devices.length > 0) {
        doc.setFontSize(14);
        doc.text("Netzwerkgeräte", 14, y);
        y += 4;
        autoTable(doc, {
          startY: y,
          head: [[ // Manuell definierte Kopfzeilen für die Gerätetabelle.
            "ID", "Name", "Typ", "IP-Adresse", "Status", "Bandbreite", "Max. Bandbreite", "Modell", "Standort"
          ]],
          body: devices.map((d: any) => [ // Mappt Gerätedaten auf Tabellenzeilen.
            d.id,
            d.name,
            d.type,
            d.ipAddress,
            d.status,
            d.bandwidth,
            d.maxBandwidth,
            d.model || "", // Fallback für leere Werte.
            d.location || "" // Fallback für leere Werte.
          ]),
          styles: { fontSize: 9 },
          headStyles: { fillColor: [41, 128, 185] }
        });
        y = (doc as any).lastAutoTable.finalY + 10;
      }

      // Fußzeile mit Exportdatum und -zeit.
      doc.setFontSize(10);
      doc.text("Export erstellt am: " + new Date().toLocaleString(), 14, y);

      doc.save("dashboard_uebersicht.pdf"); // Speichert das generierte PDF.
    } catch (error) {
      console.error("PDF-Export fehlgeschlagen:", error); // Loggt den Fehler in der Konsole.
      alert("PDF-Export fehlgeschlagen!"); // Zeigt eine Fehlermeldung an.
    }
  };

  return (
    // Hauptcontainer des Dashboards mit Flexbox-Layout und Hintergrundfarben für hellen/dunklen Modus.
    <div className="flex h-screen bg-slate-50 dark:bg-background">
      {/* Seitenleiste für Navigation */}
      <Sidebar />
      {/* Hauptinhaltsbereich, der den Rest des Bildschirms einnimmt und Scrollen ermöglicht. */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header-Bereich des Dashboards */}
        <header className="bg-white dark:bg-card shadow-sm border-b border-slate-200 dark:border-border px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Titel und Beschreibung des Dashboards */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-foreground">Netzwerk Dashboard</h2>
              <p className="text-sm text-slate-600 dark:text-muted-foreground mt-1">
                Echtzeit-Überwachung Ihrer Netzwerkinfrastruktur
              </p>
            </div>
            {/* Interaktionsbereich im Header (Suche, Export, Live-Status) */}
            <div className="flex items-center space-x-4">
              {/* Suchleiste für Geräte */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Geräte suchen..."
                  className="pl-10 w-64"
                />
              </div>
              {/* Export-Button für PDF */}
              <Button onClick={handleExport} className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
              {/* Live-Statusanzeige */}
              <div className="flex items-center space-x-2 text-sm">
                <Circle className="h-2 w-2 bg-success rounded-full animate-pulse-dot fill-current text-success" />
                <span className="text-slate-600 dark:text-muted-foreground">Live</span>
              </div>
            </div>
          </div>
        </header>
        {/* Hauptinhaltsbereich des Dashboards */}
        <main className="flex-1 overflow-auto p-6">
          {/* Übersicht der Metriken */}
          <MetricsOverview />
          {/* Diagramm-Sektion mit Bandbreiten- und Gerätestatus-Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <BandwidthChart />
            <DeviceStatusChart />
          </div>
          {/* Tabelle der Netzwerkgeräte */}
          <DeviceTable />
        </main>
      </div>
    </div>
  );
}