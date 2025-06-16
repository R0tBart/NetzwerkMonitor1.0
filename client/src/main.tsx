// Importiert React, obwohl es in JSX-Dateien nicht explizit verwendet werden muss, ist es eine gängige Praxis.
import React from "react";
// Importiert `createRoot` von `react-dom/client`, um die React-Anwendung im Browser zu rendern.
import { createRoot } from "react-dom/client";
// Importiert `BrowserRouter` von `react-router-dom` für das clientseitige Routing.
import { BrowserRouter } from "react-router-dom";
// Importiert die Hauptkomponente der Anwendung.
import App from "./App";
// Importiert die globalen CSS-Stile der Anwendung.
import "./index.css";

// Sucht das HTML-Element mit der ID 'root' im DOM, wo die React-Anwendung eingehängt werden soll.
// Das Ausrufezeichen `!` ist ein Non-null assertion operator, der TypeScript mitteilt, dass das Element definitiv existiert.
createRoot(document.getElementById("root")!).render(
  // `BrowserRouter` stellt die Routing-Funktionalität für die gesamte Anwendung bereit.
  <BrowserRouter>
    {/* Die Hauptkomponente `App` wird innerhalb des Routers gerendert. */}
    <App />
  </BrowserRouter>
);