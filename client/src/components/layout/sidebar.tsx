
// Importiert Hilfsfunktionen für Klassennamen-Konditionalisierung.
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom"; // Importiert Link und useLocation von react-router-dom
// Importiert Icons von lucide-react für die Navigation.
import {
  LayoutDashboard, // Icon für Dashboard
  Server,          // Icon für Server/Geräte
  TrendingUp,      // Icon für Analysen
  Bell,            // Icon für Alerts
  Settings,        // Icon für Einstellungen
  Network,
  User,
} from "lucide-react";


// Definiert die Navigationspunkte der Sidebar.
const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
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
  const location = useLocation().pathname; // Ermittelt den aktuellen Pfad der URL.

  return (
    // Hauptcontainer der Sidebar mit Styling für Breite, Hintergrund, Schatten und Rahmen.
    <div className="w-64 bg-white dark:bg-sidebar shadow-lg border-r border-slate-200 dark:border-sidebar-border flex flex-col"> {/* Sidebar-Container */}
      {/* Logo-Bereich der Sidebar. */}
      <div className="p-6 border-b border-slate dark:border-sidebar-border"> {/* Logo-Bereich */}
         <div> 
            <img src="/image/layer8.png" alt="Logo" className="h-full w-full object-contain" />{/* Logo-Icon. */}
          </div>
    </div>

      {/* Navigationsbereich. */}
      <nav className="flex-1 p-4"> {/* Navigationsbereich */}
        <ul className="space-y-2"> {/* Liste der Navigationspunkte */}
          {/* Rendert jeden Navigationspunkt. */}
          {navigation.map((item) => { // Iteriert über Navigationspunkte
            // Bestimmt, ob der aktuelle Navigationspunkt aktiv ist.
            const isActive = location === item.href || (item.href === "/" && location === "/"); // Überprüft, ob der Link aktiv ist
            // Holt das Icon für den Navigationspunkt.
            const Icon = item.icon;
            
            return (
              <li key={item.name}> {/* Listenelement für jeden Navigationspunkt */}
                {/* Link-Komponente für die Navigation. */}
                <Link to={item.href}> {/* Verwendet 'to' statt 'href' für react-router-dom Link */}
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
      <div className="p-4 border-t border-slate-200 dark:border-sidebar-border"> {/* Benutzerprofil-Bereich */}
        <div className="flex items-center space-x-3"> {/* Benutzerinformationen */}
          {/* Benutzer-Avatar oder Platzhalter. */}
          <div className="w-8 h-8 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center"> {/* Avatar-Platzhalter */}
            <User className="text-slate-600 dark:text-slate-300 h-4 w-4" /> {/* Benutzer-Icon */}
          </div>
          {/* Benutzerinformationen. */}
          <div className="flex-1"> {/* Textinformationen des Benutzers */}
            <p className="text-sm font-medium text-slate-800 dark:text-sidebar-foreground">Admin User</p> {/* Benutzername */}
            <p className="text-xs text-slate-500 dark:text-muted-foreground">Administrator</p> {/* Benutzerrolle */}
          </div>
        </div>
      </div>
    </div>
  );
}
