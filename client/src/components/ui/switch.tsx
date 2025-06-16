// Importiert React für die Komponentendefinition.
import * as React from "react"

// Importiert die Switch-Komponenten-Primitive von Radix UI.
import * as SwitchPrimitives from "@radix-ui/react-switch"

// Importiert eine Utility-Funktion zum Zusammenführen von Klassennamen.
import { cn } from "@/lib/utils"

// Definiert die Switch-Komponente unter Verwendung von React.forwardRef, um eine Referenz an das DOM-Element weiterzuleiten.
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>, // Typ des Referenzelements, das ein HTML-Button-Element ist.
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> // Leitet alle Props des nativen Button-Elements weiter.
>(({ className, ...props }, ref) => (
  // Rendert die Root-Komponente des Switches von Radix UI.
  <SwitchPrimitives.Root
    // Wendet Standardstile und zusätzliche, über `className` übergebene Stile an.
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props} // Leitet alle weiteren Props an die Root-Komponente weiter.
    ref={ref} // Leitet die Ref an das Root-Element weiter.
  >
    {/* Rendert den Daumen (Thumb) des Switches. */}
    <SwitchPrimitives.Thumb
      // Wendet Standardstile für den Daumen an, einschließlich Übergängen für die Bewegung.
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))

// Setzt den Display-Namen für die Switch-Komponente, nützlich für Debugging in React DevTools.
Switch.displayName = SwitchPrimitives.Root.displayName

// Exportiert die Switch-Komponente für die Verwendung in anderen Teilen der Anwendung.
export { Switch }
