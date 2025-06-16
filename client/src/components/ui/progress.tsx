"use client"

// Importiert React für die Komponentendefinition.
import * as React from "react"
// Importiert alle Komponenten von `@radix-ui/react-progress` als `ProgressPrimitive`.
import * as ProgressPrimitive from "@radix-ui/react-progress"

// Importiert die `cn`-Hilfsfunktion zum Zusammenführen von Klassennamen.
import { cn } from "@/lib/utils"

// Definiert die `Progress`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert einen Fortschrittsbalken.
// `className`: Zusätzliche CSS-Klassen.
// `value`: Der aktuelle Wert des Fortschritts (0-100).
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
// Setzt den Anzeigenamen für die `Progress`-Komponente.
Progress.displayName = ProgressPrimitive.Root.displayName

// Exportiert die `Progress`-Komponente.
export { Progress }
