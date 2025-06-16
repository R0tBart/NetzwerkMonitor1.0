import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Importiert notwendige Komponenten und Hooks von React und anderen Bibliotheken.
// `Button` wird für UI-Elemente verwendet.
// `useQuery` ist ein Hook von `@tanstack/react-query` für das Daten-Fetching.
// `Chart as ChartJS`, `ArcElement`, `Tooltip`, `Legend` sind Kernkomponenten von Chart.js für Diagramme.
// `Doughnut` ist die Doughnut-Diagrammkomponente von `react-chartjs-2`.
// `Device` ist ein Typ, der aus dem gemeinsamen Schema importiert wird.
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import type { Device } from "@shared/schema";

// Registriert die notwendigen Chart.js-Komponenten, die für das Doughnut-Diagramm benötigt werden.
ChartJS.register(ArcElement, Tooltip, Legend);

// Definiert die `DeviceStatusChart`-Komponente.
export default function DeviceStatusChart() {
  // Verwendet den `useQuery`-Hook, um Gerätedaten abzurufen.
  // `queryKey` ist der eindeutige Schlüssel für diese Abfrage.
  // `refetchInterval` legt fest, dass die Daten alle 30 Sekunden aktualisiert werden sollen.
  const { data: devices, isLoading } = useQuery<Device[]> ({
    queryKey: ["/api/devices"],
    refetchInterval: 30000, // Daten alle 30 Sekunden aktualisieren
  });

  // Zeigt einen Ladezustand an, während die Daten abgerufen werden.
  // Dies beinhaltet eine Skelett-UI für die Karte, den Titel und den Diagrammbereich.
  if (isLoading) {
    return (
      <Card className="bg-white dark:bg-card shadow-sm border border-slate-200 dark:border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-slate-800 dark:text-foreground">
              Gerätestatus
            </CardTitle>
            <div className="h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  // Zählt die Vorkommen jedes Gerätestatus (online, warning, offline, maintenance).
  // Reduziert das `devices`-Array zu einem Objekt, das die Anzahl pro Status enthält.
  const statusCounts = devices?.reduce((acc, device) => {
    acc[device.status] = (acc[device.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  // Definiert menschenlesbare Bezeichnungen für jeden Gerätestatus.
  const statusLabels = {
    online: 'Online',
    warning: 'Warnung',
    offline: 'Offline',
    maintenance: 'Wartung'
  };

  // Definiert die Farben, die für jeden Gerätestatus im Diagramm verwendet werden sollen.
  const statusColors = {
    online: '#10b981',
    warning: '#f59e0b',
    offline: '#ef4444',
    maintenance: '#64748b'
  };

  // Bereitet die Daten für das Doughnut-Diagramm vor.
  // `labels` sind die Statusbezeichnungen (z.B. 'Online', 'Warnung').
  // `datasets` enthält die tatsächlichen Zählwerte und die entsprechenden Hintergrundfarben.
  const chartData = {
    labels: Object.keys(statusCounts).map(status => statusLabels[status as keyof typeof statusLabels] || status),
    datasets: [{
      data: Object.values(statusCounts),
      backgroundColor: Object.keys(statusCounts).map(status => statusColors[status as keyof typeof statusColors] || '#64748b'),
      borderWidth: 0,
    }]
  };

  // Konfiguriert die Optionen für das Doughnut-Diagramm.
  // `responsive` stellt sicher, dass das Diagramm auf Größenänderungen reagiert.
  // `maintainAspectRatio` ist auf `false` gesetzt, um eine flexible Größenanpassung zu ermöglichen.
  // `plugins.legend` konfiguriert die Legende, einschließlich ihrer Position und des Punktstils.
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        }
      }
    }
  };

  // Rendert die Benutzeroberfläche der Gerätestatus-Diagrammkomponente.
  // Zeigt eine `Card` mit einem Header, der den Titel und einen "Details anzeigen"-Button enthält.
  // Der `CardContent`-Bereich enthält das `Doughnut`-Diagramm mit den vorbereiteten Daten und Optionen.
  return (
    <Card className="bg-white dark:bg-card shadow-sm border border-slate-200 dark:border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-800 dark:text-foreground">
            Gerätestatus
          </CardTitle>
          <Button variant="link" className="text-sm text-primary hover:text-blue-700 font-medium p-0">
            Details anzeigen
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <Doughnut data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
