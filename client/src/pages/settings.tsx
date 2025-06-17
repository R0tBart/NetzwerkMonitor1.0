import Sidebar from "@/components/layout/sidebar";
import { useState, useEffect } from "react";
import { useTheme } from "../components/theme-provider";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [darkMode, setDarkMode] = useState(theme === "dark");

  useEffect(() => {
    setDarkMode(theme === "dark");
  }, [theme]);
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800 px-8 py-5 shadow-sm">
          <h1 className="text-3xl font-bold tracking-tight">Einstellungen</h1>
          <p className="text-base text-slate-600 dark:text-slate-400 mt-1">
            System- und Benutzer-Einstellungen
          </p>
        </header>
        <main className="flex-1 p-8 bg-slate-50 dark:bg-slate-950 transition-colors">
          <section className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded shadow p-8 space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <label htmlFor="darkModeToggle" className="flex items-center gap-2">
                <span>Dark Mode</span>
              </label>
              <input
                id="darkModeToggle"
                type="checkbox"
                checked={darkMode}
                onChange={e => {
                  setDarkMode(e.target.checked);
                  setTheme(e.target.checked ? "dark" : "light");
                }}
                className="w-5 h-5 accent-blue-600"
                title="Dark Mode aktivieren/deaktivieren"
              />
            </div>
            <div className="flex items-center justify-between border-b pb-4">
              <span>2-Faktor-Authentifizierung</span>
              <input
                type="checkbox"
                checked={twoFactor}
                onChange={e => setTwoFactor(e.target.checked)}
                className="w-5 h-5 accent-blue-600"
                title="2-Faktor-Authentifizierung aktivieren/deaktivieren"
              />
            </div>
            <div className="flex items-center justify-between border-b pb-4">
              <span>Passwort ändern</span>
              <button className="px-3 py-1 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition">Ändern</button>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="securityLevelSelect" className="mb-0">
                Sicherheitslevel
              </label>
              <select
                id="securityLevelSelect"
                className="border rounded px-2 py-1 bg-white dark:bg-slate-900 dark:border-slate-700"
                title="Sicherheitslevel auswählen"
              >
                <option>Standard</option>
                <option>Hoch</option>
                <option>Maximal</option>
              </select>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}