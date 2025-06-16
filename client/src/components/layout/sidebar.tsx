import { Link, useLocation } from "wouter";
// Importiert Hilfsfunktionen für Klassennamen-Konditionalisierung.
import { cn } from "@/lib/utils";
// Importiert Icons von lucide-react für die Navigation.
import {
  LayoutDashboard, // Icon für Dashboard
  Server,          // Icon für Server/Geräte
  TrendingUp,      // Icon für Analysen
  Bell,            // Icon für Alerts
  Settings,        // Icon für Einstellungen
  Network,
  User,
  Shield,          // Icon für Sicherheit
  Key              // Icon für Passwörter
} from "lucide-react";


// Definiert die Navigationspunkte der Sidebar.
const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Sicherheit", href: "/security", icon: Shield },
  { name: "Passwörter", href: "/passwords", icon: Key },
  { name: "Geräte", href: "/devices", icon: Server },
  { name: "Analysen", href: "/analytics", icon: TrendingUp },
  { name: "Alerts", href: "/alerts", icon: Bell },
  { name: "Einstellungen", href: "/settings", icon: Settings },
];

/**
 * `Sidebar`-Komponente rendert die Hauptnavigation der Anwendung.
 * Sie zeigt Links zu verschiedenen Bereichen wie Dashboard, Sicherheit, Passwörter usw.
 */
export default function Sidebar() {
  // Ermittelt den aktuellen Pfad der URL.
  const [location] = useLocation();

  return (
    // Hauptcontainer der Sidebar mit Styling für Breite, Hintergrund, Schatten und Rahmen.
    <div className="w-64 bg-white dark:bg-sidebar shadow-lg border-r border-slate-200 dark:border-sidebar-border flex flex-col">
      {/* Logo-Bereich der Sidebar. */}
      <div className="p-6 border-b border-slate-200 dark:border-sidebar-border">
        <div className="flex items-center space-x-3">
          {/* Logo-Icon. */}
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Network className="text-white h-4 w-4" />
          </div>
          {/* Anwendungsname. */}
          <h1 className="text-xl font-bold text-slate-800 dark:text-sidebar-foreground">NetzMonitor</h1>
        </div>
      </div>

      {/* Navigationsbereich. */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {/* Rendert jeden Navigationspunkt. */}
          {navigation.map((item) => {
            // Bestimmt, ob der aktuelle Navigationspunkt aktiv ist.
            const isActive = location === item.href || (item.href === "/" && location === "/");
            // Holt das Icon für den Navigationspunkt.
            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                {/* Link-Komponente für die Navigation. */}
                <Link href={item.href}>
                  {/* Styling für den Navigationspunkt, abhängig davon, ob er aktiv ist. */}
                  <div
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer",
                      isActive
                        ? "bg-primary text-white"
                        : "text-slate-600 dark:text-sidebar-foreground hover:bg-slate-100 dark:hover:bg-sidebar-accent"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Benutzerprofil-Bereich. */}
      <div className="p-4 border-t border-slate-200 dark:border-sidebar-border">
        <div className="flex items-center space-x-3">
          {/* Benutzer-Avatar oder Platzhalter. */}
          <div className="w-8 h-8 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center">
            <User className="text-slate-600 dark:text-slate-300 h-4 w-4" />
          </div>
          {/* Benutzerinformationen. */}
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-800 dark:text-sidebar-foreground">Admin User</p>
            <p className="text-xs text-slate-500 dark:text-muted-foreground">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}
