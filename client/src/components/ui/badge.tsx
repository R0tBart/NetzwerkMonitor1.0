// Importiert React für die Typdefinitionen von HTML-Attributen.
import * as React from "react"
// Importiert `cva` und `VariantProps` von `class-variance-authority` zur Erstellung von variantenbasierten Styles.
import { cva, type VariantProps } from "class-variance-authority"

// Importiert die `cn`-Hilfsfunktion zum Konditionalen Zusammenführen von Klassennamen.
import { cn } from "@/lib/utils"

// Definiert die `badgeVariants` mit `cva` für verschiedene Stilvarianten von Badge-Komponenten.
// `base`: Grundlegende Stile für das Badge, die immer angewendet werden.
// `variants`: Definiert verschiedene visuelle Varianten (z.B. `default`, `secondary`, `destructive`, `outline`).
// `defaultVariants`: Setzt die Standardvariante auf `default`, wenn keine Variante explizit angegeben wird.
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80", // Standard-Badge mit primärer Farbe.
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80", // Sekundäres Badge mit sekundärer Farbe.
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80", // Destruktives Badge für Warnungen/Fehler.
        outline: "text-foreground", // Outline-Badge mit Vordergrundfarbe.
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// Definiert das Interface `BadgeProps`, das die HTML-Attribute für ein `div`-Element und die Varianten-Props von `badgeVariants` kombiniert.
// Dies ermöglicht die Übergabe von Standard-HTML-Attributen sowie spezifischen Badge-Varianten.
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, // Standard-HTML-Attribute für ein div-Element.
    VariantProps<typeof badgeVariants> {} // Varianten-Props, die von `badgeVariants` definiert werden.

// Definiert die `Badge`-Komponente.
// Sie akzeptiert `className`, `variant` und andere Props, die an das zugrunde liegende `div`-Element weitergeleitet werden.
// `className`: Wendet die durch `badgeVariants` generierten Stile an, basierend auf der gewählten Variante und zusätzlichen Klassen.
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

// Exportiert die `Badge`-Komponente und die `badgeVariants` zur Verwendung in anderen Teilen der Anwendung.
export { Badge, badgeVariants }
