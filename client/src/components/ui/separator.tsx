// Importiert React für die Komponentendefinition.
import * as React from "react"
// Importiert alle Komponenten von `@radix-ui/react-separator` als `SeparatorPrimitive`.
import * as SeparatorPrimitive from "@radix-ui/react-separator"

// Importiert die `cn`-Hilfsfunktion zum Zusammenführen von Klassennamen.
import { cn } from "@/lib/utils"

// Definiert die `Separator`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert einen visuellen Separator.
// `className`: Zusätzliche CSS-Klassen.
// `orientation`: Ausrichtung des Separators (Standard: "horizontal").
// `decorative`: Ob der Separator dekorativ ist (Standard: true).
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
// Setzt den Anzeigenamen für die `Separator`-Komponente.
Separator.displayName = SeparatorPrimitive.Root.displayName

// Exportiert die `Separator`-Komponente.
export { Separator }
