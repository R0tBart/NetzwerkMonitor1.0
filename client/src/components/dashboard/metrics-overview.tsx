import { Card, CardContent } from "@/components/ui/card";
// Importiert Icons von `lucide-react` für visuelle Darstellungen der Metriken.
// `Server`, `Gauge`, `AlertTriangle`, `TrendingUp`, `ArrowUp`, `CheckCircle` werden verwendet.
import { Server, Gauge, AlertTriangle, TrendingUp, ArrowUp, CheckCircle } from "lucide-react";
// Importiert den `useQuery`-Hook von `@tanstack/react-query` für das Daten-Fetching.
import { useQuery } from "@tanstack/react-query";
// Importiert den `SystemMetric`-Typ aus dem gemeinsamen Schema.
import type { SystemMetric } from "@shared/schema";

// Definiert die Hauptkomponente `MetricsOverview`.
export default function MetricsOverview() {
  // Verwendet den `useQuery`-Hook, um die neuesten Systemmetriken abzurufen.
  // `queryKey` ist der eindeutige Schlüssel für diese Abfrage.
  // `refetchInterval` legt fest, dass die Daten alle 5 Sekunden aktualisiert werden sollen.
  const { data: metrics, isLoading } = useQuery<SystemMetric>({
    queryKey: ["/api/system-metrics/latest"],
    refetchInterval: 5000, // Alle 5 Sekunden aktualisieren
  });

  // Zeigt einen Ladezustand an, während die Daten abgerufen werden.
  // Dies beinhaltet eine Skelett-UI für die Metrikkarten.
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Definiert die Daten für die anzuzeigenden Metrikkarten.
  // Jedes Objekt enthält Titel, Wert, Änderungsbeschreibung, Änderungstyp, Icon und Farbstile.
  const metricsData = [
    {
      title: "Aktive Geräte",
      value: metrics?.activeDevices?.toString() || "0",
      change: "+5 seit gestern",
      changeType: "positive" as const,
      icon: Server,
      iconBg: "bg-blue-100 dark:bg-blue-900",
      iconColor: "text-primary",
    },
    {
      title: "Gesamtbandbreite",
      value: `${metrics?.totalBandwidth?.toFixed(1) || "0"} GB/s`,
      change: "12% Auslastung",
      changeType: "positive" as const,
      icon: Gauge,
      iconBg: "bg-green-100 dark:bg-green-900",
      iconColor: "text-success",
    },
    {
      title: "Warnungen",
      value: metrics?.warnings?.toString() || "0",
      change: "Aufmerksamkeit erforderlich",
      changeType: "warning" as const,
      icon: AlertTriangle,
      iconBg: "bg-amber-100 dark:bg-amber-900",
      iconColor: "text-warning",
    },
    {
      title: "Uptime",
      value: `${metrics?.uptime?.toFixed(1) || "0"}%`,
      change: "Ausgezeichnet",
      changeType: "positive" as const,
      icon: TrendingUp,
      iconBg: "bg-emerald-100 dark:bg-emerald-900",
      iconColor: "text-success",
    },
  ];

  // Rendert die Benutzeroberfläche der Metriken-Übersicht.
  // Zeigt ein Grid von `Card`-Komponenten, die jeweils eine Metrik darstellen.
  // Jede Karte enthält den Titel, den Wert, die Änderungsbeschreibung und ein passendes Icon.
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metricsData.map((metric) => {
        const Icon = metric.icon;
        const ChangeIcon = metric.changeType === "positive" ? ArrowUp :
                          metric.changeType === "warning" ? AlertTriangle : CheckCircle;
        
        return (
          <Card key={metric.title} className="bg-white dark:bg-card shadow-sm border border-slate-200 dark:border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-muted-foreground">
                    {metric.title}
                  </p>
                  <p className="text-3xl font-bold text-slate-800 dark:text-foreground mt-2">
                    {metric.value}
                  </p>
                  <p className={`text-sm mt-1 flex items-center gap-1 ${
                    metric.changeType === "positive" ? "text-success" :
                    metric.changeType === "warning" ? "text-warning" : "text-success"
                  }`}>
                    <ChangeIcon className="h-3 w-3" />
                    {metric.change}
                  </p>
                </div>
                <div className={`w-12 h-12 ${metric.iconBg} rounded-lg flex items-center justify-center`}>
                  <Icon className={`${metric.iconColor} h-6 w-6`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
