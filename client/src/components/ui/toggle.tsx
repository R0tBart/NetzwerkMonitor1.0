// Importiert React für die Komponentendefinition.
import * as React from "react"

// Importiert die Toggle-Komponenten-Primitive von Radix UI.
import * as TogglePrimitive from "@radix-ui/react-toggle"
// Importiert cva (class-variance-authority) für die bedingte Anwendung von Tailwind-Klassen und VariantProps für Typdefinitionen.
import { cva, type VariantProps } from "class-variance-authority"

// Importiert eine Utility-Funktion zum Zusammenführen von Klassennamen.
import { cn } from "@/lib/utils"

// Definiert die Varianten für die Toggle-Komponente mit cva.
const toggleVariants = cva(
  // Basisstile für den Toggle-Button.
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2",
  {
    // Definiert verschiedene Varianten und Größen des Toggle-Buttons.
    variants: {
      variant: {
        // Standard-Variante ohne Hintergrund.
        default: "bg-transparent",
        // Outline-Variante mit Rahmen.
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        // Standardgröße.
        default: "h-10 px-3 min-w-10",
        // Kleine Größe.
        sm: "h-9 px-2.5 min-w-9",
        // Große Größe.
        lg: "h-11 px-5 min-w-11",
      },
    },
    // Setzt die Standardvarianten.
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Definiert die Toggle-Komponente unter Verwendung von React.forwardRef, um eine Referenz an das DOM-Element weiterzuleiten.
const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>, // Typ des Referenzelements.
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & // Leitet alle Props des nativen Root-Elements weiter.
    VariantProps<typeof toggleVariants> // Fügt die VariantProps hinzu.
>(({ className, variant, size, ...props }, ref) => (
  // Rendert die Root-Komponente des Toggles von Radix UI.
  <TogglePrimitive.Root
    ref={ref} // Leitet die Ref an das Root-Element weiter.
    // Wendet die durch `toggleVariants` definierten Stile und zusätzliche, über `className` übergebene Stile an.
    className={cn(toggleVariants({ variant, size, className }))}
    {...props} // Leitet alle weiteren Props an die Root-Komponente weiter.
  />
))

// Setzt den Display-Namen für die Toggle-Komponente, nützlich für Debugging in React DevTools.
Toggle.displayName = TogglePrimitive.Root.displayName

// Exportiert die Toggle-Komponente und ihre Varianten für die Verwendung in anderen Teilen der Anwendung.
export { Toggle, toggleVariants }
