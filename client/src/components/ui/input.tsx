// Importiert React für die Komponentendefinition.
import * as React from "react"

// Importiert die `cn`-Hilfsfunktion zum Zusammenführen von Klassennamen.
import { cn } from "@/lib/utils"

// Definiert die `Input`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert ein HTML `<input>` Element.
// `className`: Zusätzliche CSS-Klassen.
// `type`: Der Typ des Input-Feldes (z.B. "text", "email", "password").
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input"> | React.ComponentPropsWithoutRef<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
// Setzt den Anzeigenamen für die `Input`-Komponente.
Input.displayName = "Input"

// Exportiert die `Input`-Komponente.
export { Input }
