// Importiert die `cn`-Hilfsfunktion zum Zusammenführen von Klassennamen.
import { cn } from "@/lib/utils"

// Definiert die `Skeleton`-Komponente.
// Diese Komponente rendert einen Platzhalter (Skeleton-Screen) während des Ladens von Inhalten.
// `className`: Zusätzliche CSS-Klassen.
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

// Exportiert die `Skeleton`-Komponente.
export { Skeleton }
