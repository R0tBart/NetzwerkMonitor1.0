// Importiert die Sidebar-Komponente für das Layout der Seite.
import Sidebar from "@/components/layout/sidebar";
// Importiert die DeviceTable-Komponente, die die Geräteliste anzeigt.
import DeviceTable from "@/components/dashboard/device-table";

/**
 * Die `Devices`-Seite bietet eine Übersicht und Verwaltung aller Netzwerkgeräte.
 * Sie zeigt eine Tabelle mit Gerätedaten an.
 */
export default function Devices() {
  return (
    // Hauptcontainer der Seite mit Flexbox-Layout und Theme-abhängigen Farben.
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Die Sidebar-Komponente für die Navigation. */}
      <Sidebar />
      {/* Hauptinhaltsbereich, der den Rest des Bildschirms einnimmt. */}
      <div className="flex-1 flex flex-col">
        {/* Header-Bereich der Geräte-Seite. */}
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800 px-8 py-5 shadow-sm">
          {/* Titel der Seite. */}
          <h1 className="text-3xl font-bold tracking-tight">Geräte</h1>
          {/* Beschreibung der Seite. */}
          <p className="text-base text-slate-600 dark:text-slate-400 mt-1">
            Übersicht und Verwaltung aller Netzwerkgeräte
          </p>
        </header>
        {/* Hauptinhalt der Seite, wo die Gerätetabelle angezeigt wird. */}
        <main className="flex-1 p-8 bg-slate-50 dark:bg-slate-950 transition-colors">
          <section className="max-w-6xl mx-auto">
            {/* Die DeviceTable-Komponente, die die eigentliche Geräteliste rendert. */}
            <DeviceTable />
          </section>
        </main>
      </div>
    </div>
  );
}