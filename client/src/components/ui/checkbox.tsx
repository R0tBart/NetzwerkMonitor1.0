// Importiert React für die Komponentendefinition.
import * as React from "react"
// Importiert alle Exporte von `@radix-ui/react-checkbox` als `CheckboxPrimitive`.
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
// Importiert das `Check`-Icon von `lucide-react`.
import { Check } from "lucide-react"

// Importiert die `cn`-Hilfsfunktion zum Konditionalen Zusammenführen von Klassennamen.
import { cn } from "@/lib/utils"

// Definiert die `Checkbox`-Komponente.
// Sie akzeptiert `className` und andere Props, die an `CheckboxPrimitive.Root` weitergeleitet werden.
// `ref`: Wird an das zugrunde liegende `CheckboxPrimitive.Root`-Element weitergeleitet.
// `className`: Wendet grundlegende Stile für die Checkbox an, wie Größe, Form, Rahmen, Fokus- und Deaktivierungszustände sowie Stile für den "checked"-Zustand.
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    {/* Definiert den Indikator für den "checked"-Zustand der Checkbox. */}
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      {/* Rendert das `Check`-Icon innerhalb des Indikators. */}
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
// Setzt den Anzeigenamen für die `Checkbox`-Komponente.
Checkbox.displayName = CheckboxPrimitive.Root.displayName

// Exportiert die `Checkbox`-Komponente zur Verwendung in anderen Teilen der Anwendung.
export { Checkbox }
