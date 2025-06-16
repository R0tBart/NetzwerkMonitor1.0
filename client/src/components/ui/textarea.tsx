// Importiert React für die Komponentendefinition.
import * as React from "react"

// Importiert eine Utility-Funktion zum Zusammenführen von Klassennamen.
import { cn } from "@/lib/utils"

// Definiert die Textarea-Komponente unter Verwendung von React.forwardRef, um eine Referenz an das DOM-Element weiterzuleiten.
const Textarea = React.forwardRef<
  HTMLTextAreaElement, // Typ des Referenzelements, das ein HTMLTextAreaElement ist.
  React.ComponentProps<"textarea"> // Leitet alle Props des nativen textarea-Elements weiter.
>(({ className, ...props }, ref) => {
  return (
    // Rendert ein natives textarea-Element.
    <textarea
      // Wendet Standardstile und zusätzliche, über `className` übergebene Stile an.
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref} // Leitet die Ref an das textarea-Element weiter.
      {...props} // Leitet alle weiteren Props an das textarea-Element weiter.
    />
  )
})

// Setzt den Display-Namen für die Textarea-Komponente, nützlich für Debugging in React DevTools.
Textarea.displayName = "Textarea"

// Exportiert die Textarea-Komponente für die Verwendung in anderen Teilen der Anwendung.
export { Textarea }
