import Sidebar from "@/components/layout/sidebar";

const mockAlerts = [
  { id: 1, type: "Warnung", message: "Hohe CPU-Auslastung am Router", time: "2025-06-03 10:12" },
  { id: 2, type: "Info", message: "Neues Gerät im Netzwerk erkannt", time: "2025-06-03 09:55" },
  { id: 3, type: "Kritisch", message: "Firewall-Regel verletzt", time: "2025-06-03 08:44" },
];

export default function Alerts() {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800 px-8 py-5 shadow-sm">
          <h1 className="text-3xl font-bold tracking-tight">Alerts</h1>
          <p className="text-base text-slate-600 dark:text-slate-400 mt-1">
            Warnungen und Benachrichtigungen im Netzwerk
          </p>
        </header>
        <main className="flex-1 p-8 bg-slate-50 dark:bg-slate-950 transition-colors">
          <section className="max-w-6xl mx-auto">
            <div className="overflow-x-auto rounded shadow bg-white dark:bg-slate-900">
              <table className="min-w-full border text-sm">
                <thead>
                  <tr>
                    <th className="border px-2 py-1">Typ</th>
                    <th className="border px-2 py-1">Nachricht</th>
                    <th className="border px-2 py-1">Zeit</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAlerts.map(alert => (
                    <tr key={alert.id}>
                      <td className="border px-2 py-1">{alert.type}</td>
                      <td className="border px-2 py-1">{alert.message}</td>
                      <td className="border px-2 py-1">{alert.time}</td>
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