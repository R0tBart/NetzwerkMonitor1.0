import { Switch, Route } from "wouter";
// Importiert den QueryClient für die Datenverwaltung mit React Query.
import { queryClient } from "./lib/queryClient";
// Importiert den Provider für React Query, um den QueryClient in der Anwendung bereitzustellen.
import { QueryClientProvider } from "@tanstack/react-query";
// Importiert die Toaster-Komponente für Benachrichtigungen.
import { Toaster } from "@/components/ui/toaster";
// Importiert den TooltipProvider für Tooltip-Funktionalität.
import { TooltipProvider } from "@/components/ui/tooltip";
// Importiert den ThemeProvider für die Verwaltung des UI-Themes (hell/dunkel).
import { ThemeProvider } from "@/components/theme-provider";

// Importiert die verschiedenen Seiten/Ansichten der Anwendung.
import Dashboard from "@/pages/dashboard";
import Security from "@/pages/security";
import Passwords from "@/pages/passwords";
import Devices from "@/pages/devices";
import Analyse from "@/pages/analytics";
import Alerts from "@/pages/alerts";
import Settings from "@/pages/settings";
import NotFound from "@/pages/not-found";

/**
 * `Router` Komponente definiert die Routen der Anwendung.
 * Sie verwendet `react-router-dom` (angenommen, da `Switch` und `Route` verwendet werden),
 * um die Navigation zwischen den verschiedenen Seiten zu handhaben.
 */
function Router() {
  return (
    // `Switch` rendert die erste `Route`, die mit dem aktuellen Pfad übereinstimmt.
    <Switch>
      {/* Standard-Route, leitet auf das Dashboard um */}
      <Route path="/" component={Dashboard} />
      {/* Route für das Dashboard */}
      <Route path="/dashboard" component={Dashboard} />
      {/* Route für die Geräteverwaltung */}
      <Route path="/devices" component={Devices} />
      {/* Route für die Analysen */}
      <Route path="/analytics" component={Analyse} />
      {/* Route für Benachrichtigungen/Alarme */}
      <Route path="/alerts" component={Alerts} />
      {/* Route für die Einstellungen */}
      <Route path="/settings" component={Settings} />
      {/* Route für die Sicherheitsfunktionen */}
      <Route path="/security" component={Security} />
      {/* Route für den Passwort-Tresor */}
      <Route path="/passwords" component={Passwords} />
      {/* Fallback-Route für nicht gefundene Seiten (404) */}
      <Route component={NotFound} />
    </Switch>
  );
}

/**
 * `App` ist die Hauptkomponente der Anwendung.
 * Sie richtet die globalen Provider ein, die für die Funktionalität der App notwendig sind.
 */
function App() {
  return (
    // Stellt das Theme für die gesamte Anwendung bereit (Standard: 'dark', speichert im localStorage).
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* Stellt den QueryClient für alle Komponenten bereit, die Daten abrufen */}
      <QueryClientProvider client={queryClient}>
        {/* Stellt Tooltip-Funktionalität für die gesamte Anwendung bereit */}
        <TooltipProvider>
          {/* Zeigt Benachrichtigungen (Toasts) an */}
          <Toaster />
          {/* Rendert die Router-Komponente, die die Seiten basierend auf der URL anzeigt */}
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;