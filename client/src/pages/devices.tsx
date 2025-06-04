import Sidebar from "@/components/layout/sidebar";
import DeviceTable from "@/components/dashboard/device-table";

export default function Devices() {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800 px-8 py-5 shadow-sm">
          <h1 className="text-3xl font-bold tracking-tight">Geräte</h1>
          <p className="text-base text-slate-600 dark:text-slate-400 mt-1">
            Übersicht und Verwaltung aller Netzwerkgeräte
          </p>
        </header>
        <main className="flex-1 p-8 bg-slate-50 dark:bg-slate-950 transition-colors">
          <section className="max-w-6xl mx-auto">
            <DeviceTable />
          </section>
        </main>
      </div>
    </div>
  );
}