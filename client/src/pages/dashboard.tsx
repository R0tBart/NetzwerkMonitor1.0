import { useEffect } from "react";
import Sidebar from "@/components/layout/sidebar";
import MetricsOverview from "@/components/dashboard/metrics-overview";
import BandwidthChart from "@/components/dashboard/bandwidth-chart";
import DeviceStatusChart from "@/components/dashboard/device-status-chart";
import DeviceTable from "@/components/dashboard/device-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, Circle } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Dashboard() {
  const queryClient = useQueryClient();

  // Geräte und Metriken laden
  const { data: devices = [] } = useQuery<any[]>({
    queryKey: ["/api/devices"],
  });
  const { data: metrics = [] } = useQuery<any[]>({
    queryKey: ["/api/bandwidth-metrics"],
  });
  const { data: bandwidthChart = [] } = useQuery<any[]>({
    queryKey: ["/api/bandwidth-metrics/chart"],
  });
  const { data: deviceStatusChart = [] } = useQuery<any[]>({
    queryKey: ["/api/device-status/chart"],
  });

  // Initialisiere Mock-Daten beim ersten Laden
  const initMockData = useMutation({
    mutationFn: () => apiRequest("POST", "/api/generate-mock-data"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bandwidth-metrics"] });
      queryClient.invalidateQueries({ queryKey: ["/api/system-metrics/history"] });
      queryClient.invalidateQueries({ queryKey: ["/api/devices"] });
      queryClient.invalidateQueries({ queryKey: ["/api/bandwidth-metrics/chart"] });
      queryClient.invalidateQueries({ queryKey: ["/api/device-status/chart"] });
    },
  });

  useEffect(() => {
    initMockData.mutate();
    // eslint-disable-next-line
  }, []);

  // PDF-Export-Funktion für alle Dashboard-Daten
  const handleExport = async () => {
    try {
      const doc = new jsPDF();
      let y = 16;

      // Titel
      doc.setFontSize(18);
      doc.text("Dashboard Übersicht", 14, y);
      y += 10;

      // Metriken
      if (metrics.length > 0) {
        doc.setFontSize(14);
        doc.text("Metriken", 14, y);
        y += 4;
        autoTable(doc, {
          startY: y,
          head: [Object.keys(metrics[0])],
          body: metrics.map((m: any) => Object.values(m)),
          styles: { fontSize: 9 },
          headStyles: { fillColor: [41, 128, 185] }
        });
        y = (doc as any).lastAutoTable.finalY + 10;
      }

      // Bandbreiten-Chart-Daten
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

      // Gerätestatus-Chart-Daten
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

      // Geräte
      if (devices.length > 0) {
        doc.setFontSize(14);
        doc.text("Netzwerkgeräte", 14, y);
        y += 4;
        autoTable(doc, {
          startY: y,
          head: [[
            "ID", "Name", "Typ", "IP-Adresse", "Status", "Bandbreite", "Max. Bandbreite", "Modell", "Standort"
          ]],
          body: devices.map((d: any) => [
            d.id,
            d.name,
            d.type,
            d.ipAddress,
            d.status,
            d.bandwidth,
            d.maxBandwidth,
            d.model || "",
            d.location || ""
          ]),
          styles: { fontSize: 9 },
          headStyles: { fillColor: [41, 128, 185] }
        });
        y = (doc as any).lastAutoTable.finalY + 10;
      }

      // Optional: Zusammenfassung oder weitere Abschnitte
      doc.setFontSize(10);
      doc.text("Export erstellt am: " + new Date().toLocaleString(), 14, y);

      doc.save("dashboard_uebersicht.pdf");
    } catch (error) {
      alert("PDF-Export fehlgeschlagen!");
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-card shadow-sm border-b border-slate-200 dark:border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-foreground">Netzwerk Dashboard</h2>
              <p className="text-sm text-slate-600 dark:text-muted-foreground mt-1">
                Echtzeit-Überwachung Ihrer Netzwerkinfrastruktur
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Geräte suchen..."
                  className="pl-10 w-64"
                />
              </div>
              <Button onClick={handleExport} className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
              <div className="flex items-center space-x-2 text-sm">
                <Circle className="h-2 w-2 bg-success rounded-full animate-pulse-dot fill-current text-success" />
                <span className="text-slate-600 dark:text-muted-foreground">Live</span>
              </div>
            </div>
          </div>
        </header>
        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <MetricsOverview />
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <BandwidthChart />
            <DeviceStatusChart />
          </div>
          <DeviceTable />
        </main>
      </div>
    </div>
  );
}