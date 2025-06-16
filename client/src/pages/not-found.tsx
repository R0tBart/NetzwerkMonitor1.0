// Importiert das AlertCircle-Icon von lucide-react.
import { AlertCircle } from "lucide-react";
// Importiert die Card- und CardContent-Komponenten von Shadcn/ui.
import { Card, CardContent } from "@/components/ui/card";

/**
 * Die `NotFound`-Komponente wird angezeigt, wenn eine nicht existierende Route aufgerufen wird (404-Fehler).
 * Sie informiert den Benutzer, dass die Seite nicht gefunden wurde.
 */
export default function NotFound() {
  return (
    // Hauptcontainer, der die gesamte Bildschirmhöhe einnimmt und den Inhalt zentriert.
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      {/* Eine Karte, die als Container für die Fehlermeldung dient. */}
      <Card className="w-full max-w-md mx-4">
        {/* Inhalt der Karte mit Padding oben. */}
        <CardContent className="pt-6">
          {/* Flex-Container für das Icon und den Titel. */}
          <div className="flex mb-4 gap-2">
            {/* Alarm-Icon zur visuellen Hervorhebung des Fehlers. */}
            <AlertCircle className="h-8 w-8 text-red-500" />
            {/* Überschrift für den 404-Fehler. */}
            <h1 className="text-2xl font-bold text-gray-900">404 Seite nicht gefunden</h1>
          </div>

          {/* Erklärender Text für den Benutzer. */}
          <p className="mt-4 text-sm text-gray-600">
            Die angeforderte Seite konnte nicht gefunden werden. Möglicherweise haben Sie vergessen, die Seite zum Router hinzuzufügen.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
