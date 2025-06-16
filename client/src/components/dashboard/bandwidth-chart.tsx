import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Importiert UI-Komponenten für die Auswahl von Zeitbereichen.
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// Importiert den Hook `useQuery` von React Query für das Daten-Fetching.
import { useQuery } from "@tanstack/react-query";
// Importiert React Hooks für den Lebenszyklus und den Zustand.
import { useEffect, useRef, useState } from "react";
// Importiert notwendige Chart.js-Komponenten für den Linienchart.
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
// Importiert die `Line`-Komponente von react-chartjs-2 zum Rendern des Liniencharts.
import { Line } from 'react-chartjs-2';
// Importiert den Typ `BandwidthMetric` aus dem gemeinsamen Schema.
import type { BandwidthMetric } from "@shared/schema";

// Registriert die benötigten Chart.js-Komponenten.
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

/**
 * `BandwidthChart`-Komponente zeigt die Bandbreitennutzung (eingehend und ausgehend) über verschiedene Zeitbereiche an.
 */
export default function BandwidthChart() {
  // Zustandsvariable für den ausgewählten Zeitbereich (Standard: "24h").
  const [timeRange, setTimeRange] = useState("24h");

  // Verwendet `useQuery`, um Bandbreitenmetriken vom Server abzurufen.
  const { data: metrics, isLoading } = useQuery<BandwidthMetric[]>(
    {
      queryKey: ["/api/bandwidth-metrics", { timeRange }], // Eindeutiger Schlüssel für die Abfrage, abhängig vom Zeitbereich.
      refetchInterval: 10000, // Daten alle 10 Sekunden aktualisieren.
      queryFn: async () => {
        // Erstellt URL-Parameter basierend auf dem ausgewählten Zeitbereich.
        const params = new URLSearchParams();
        if (timeRange === "24h") {
          params.append("limit", "24"); // Für 24 Stunden, limitiere auf 24 Datenpunkte.
        } else if (timeRange === "7d") {
          params.append("days", "7"); // Für 7 Tage.
        } else if (timeRange === "30d") {
          params.append("days", "30"); // Für 30 Tage.
        }
        // Führt die API-Anfrage durch und gibt die Daten zurück.
        const response = await fetch(`/api/bandwidth-metrics?${params.toString()}`);
        return response.json();
      },
    }
  );

  // Bereitet die Daten für den Chart auf.
  const chartData = {
    // Beschriftungen für die X-Achse (Zeitstempel).
    labels: metrics?.map(m => {
      const date = new Date(m.timestamp);
      if (timeRange === "24h") {
        // Formatiert die Zeit für die letzten 24 Stunden.
        return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
      } else if (timeRange === "7d" || timeRange === "30d") {
        // Formatiert das Datum für die letzten 7 oder 30 Tage.
        return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
      }
      return '';
    }).reverse() || [], // Kehrt die Reihenfolge um, um die neuesten Daten rechts anzuzeigen.
    datasets: [
      {
        label: 'Eingehend (GB/s)', // Beschriftung für die eingehende Bandbreite.
        data: metrics?.map(m => m.incoming).reverse() || [], // Eingehende Daten.
        borderColor: '#2563eb', // Farbe der Linie.
        backgroundColor: 'rgba(37, 99, 235, 0.1)', // Hintergrundfarbe des Bereichs unter der Linie.
        fill: true, // Füllt den Bereich unter der Linie.
        tension: 0.4, // Glättet die Linie.
      },
      {
        label: 'Ausgehend (GB/s)', // Beschriftung für die ausgehende Bandbreite.
        data: metrics?.map(m => m.outgoing).reverse() || [], // Ausgehende Daten.
        borderColor: '#10b981', // Farbe der Linie.
        backgroundColor: 'rgba(16, 185, 129, 0.1)', // Hintergrundfarbe des Bereichs unter der Linie.
        fill: true, // Füllt den Bereich unter der Linie.
        tension: 0.4, // Glättet die Linie.
      }
    ]
  };

  // Optionen für den Chart.
  const options = {
    responsive: true, // Chart ist responsiv.
    maintainAspectRatio: false, // Behält das Seitenverhältnis nicht bei.
    plugins: {
      legend: {
        position: 'top' as const, // Legende oben positionieren.
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Y-Achse beginnt bei Null.
        grid: {
          color: 'rgba(148, 163, 184, 0.1)', // Farbe der Gitterlinien.
        },
      },
      x: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)', // Farbe der Gitterlinien.
        },
      },
    },
  };

  // Zeigt einen Ladezustand an, während die Daten geladen werden.
  if (isLoading) {
    return (
      <Card className="bg-white dark:bg-card shadow-sm border border-slate-200 dark:border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-slate-800 dark:text-foreground">
              Bandbreitennutzung
            </CardTitle>
            <div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  // Rendert die Chart-Komponente mit den abgerufenen Daten und Optionen.
  return (
    <Card className="bg-white dark:bg-card shadow-sm border border-slate-200 dark:border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-800 dark:text-foreground">
            Bandbreitennutzung
          </CardTitle>
          {/* Auswahlfeld für den Zeitbereich. */}
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Letzte 24h</SelectItem>
              <SelectItem value="7d">Letzte 7 Tage</SelectItem>
              <SelectItem value="30d">Letzter Monat</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <Line data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
