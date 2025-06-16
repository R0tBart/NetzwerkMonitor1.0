// Importiert React für die Komponentendefinition.
import * as React from "react"
// Importiert alle Komponenten von `@radix-ui/react-label` als `LabelPrimitive`.
import * as LabelPrimitive from "@radix-ui/react-label"
// Importiert `cva` und `VariantProps` von `class-variance-authority` für die Variantenverwaltung von CSS-Klassen.
import { cva, type VariantProps } from "class-variance-authority"

// Importiert die `cn`-Hilfsfunktion zum Zusammenführen von Klassennamen.
import { cn } from "@/lib/utils"

// Definiert die Varianten für das Label mit `cva`.
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

// Definiert die `Label`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert ein HTML `<label>` Element mit Styling-Varianten.
// `className`: Zusätzliche CSS-Klassen.
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
// Setzt den Anzeigenamen für die `Label`-Komponente.
Label.displayName = LabelPrimitive.Root.displayName

// Exportiert die `Label`-Komponente.
export { Label }
