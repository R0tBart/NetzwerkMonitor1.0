import { QueryClient, QueryFunction } from "@tanstack/react-query";

// Hilfsfunktion, die einen Fehler wirft, wenn die HTTP-Antwort nicht erfolgreich ist.
async function throwIfResNotOk(res: Response) {
  // Überprüft, ob die Antwort `ok` ist (d.h. der Statuscode ist 2xx).
  if (!res.ok) {
    // Extrahiert den Fehlertext aus der Antwort oder verwendet den StatusText.
    const text = (await res.text()) || res.statusText;
    // Wirft einen Fehler mit dem Statuscode und dem Fehlertext.
    throw new Error(`${res.status}: ${text}`);
  }
}

/**
 * Führt eine API-Anfrage aus.
 * @param method Die HTTP-Methode (z.B. 'GET', 'POST', 'PUT', 'DELETE').
 * @param url Die URL des Endpunkts.
 * @param data Optionale Daten, die als JSON im Anfragekörper gesendet werden sollen.
 * @returns Eine Promise, die mit der HTTP-Antwort aufgelöst wird.
 */
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Führt den Fetch-Aufruf mit den angegebenen Optionen aus.
  const res = await fetch(url, {
    method, // Die HTTP-Methode.
    // Setzt den Content-Type-Header auf 'application/json', wenn Daten vorhanden sind.
    headers: data ? { "Content-Type": "application/json" } : {},
    // Sendet die Daten als JSON-String im Anfragekörper, falls vorhanden.
    body: data ? JSON.stringify(data) : undefined,
    // Stellt sicher, dass Anmeldeinformationen (z.B. Cookies) mitgesendet werden.
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}


// Definiert das Verhalten bei einem 401 (Unauthorized) Statuscode.
export type UnauthorizedBehavior = "returnNull" | "throw";

/**
 * Erstellt eine Query-Funktion für `@tanstack/react-query`.
 * Diese Funktion behandelt API-Anfragen und Fehler, insbesondere 401-Fehler.
 * @param options Optionen für die Query-Funktion, z.B. das Verhalten bei 401-Fehlern.
 * @returns Eine `QueryFunction`, die von `@tanstack/react-query` verwendet werden kann.
 */
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // Führt den Fetch-Aufruf mit der ersten Query-Key als URL aus.
    const res = await fetch(queryKey[0] as string, {
      credentials: "include", // Sendet Anmeldeinformationen mit.
    });

    // Behandelt den 401-Fehler basierend auf dem konfigurierten Verhalten.
    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null; // Gibt null zurück, wenn `returnNull` konfiguriert ist.
    }

    // Wirft einen Fehler, wenn die Antwort nicht ok ist (außer bei 401, wenn `returnNull` aktiv ist).
    await throwIfResNotOk(res);
    // Gibt die JSON-Antwort zurück.
    return await res.json();
  };

// Erstellt eine neue Instanz von QueryClient, dem zentralen Cache für React Query.
export const queryClient = new QueryClient({
  // Standardoptionen, die für alle Queries und Mutationen gelten.
  defaultOptions: {
    queries: {
      // Die Standard-Query-Funktion, die bei 401-Fehlern einen Fehler wirft.
      queryFn: getQueryFn({ on401: "throw" }),
      // Deaktiviert das automatische Neuladen von Daten in bestimmten Intervallen.
      refetchInterval: false,
      // Deaktiviert das automatische Neuladen von Daten, wenn das Fenster wieder fokussiert wird.
      refetchOnWindowFocus: false,
      // Legt fest, wie lange Daten als "frisch" betrachtet werden. `Infinity` bedeutet, dass Daten nie veralten.
      staleTime: Infinity,
      // Deaktiviert automatische Wiederholungsversuche bei fehlgeschlagenen Queries.
      retry: false,
    },
    mutations: {
      // Deaktiviert automatische Wiederholungsversuche bei fehlgeschlagenen Mutationen.
      retry: false,
    },
  },
});
