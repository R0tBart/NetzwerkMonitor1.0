// Importiert React für die Komponentendefinition und Typen.
import * as React from "react"
// Importiert `Slot` von `@radix-ui/react-slot` für flexible Rendering-Logik, die es ermöglicht, Props an ein untergeordnetes Element weiterzuleiten.
import { Slot } from "@radix-ui/react-slot"
// Importiert `cva` (Class Variance Authority) und `VariantProps` zur Erstellung von variantenbasierten Styles, die dynamisch auf Props reagieren.
import { cva, type VariantProps } from "class-variance-authority"

// Importiert die `cn`-Hilfsfunktion zum Konditionalen Zusammenführen von Klassennamen, was für Tailwind CSS nützlich ist.
import { cn } from "@/lib/utils"

// Definiert die `buttonVariants` mit `cva` für verschiedene Stilvarianten von Button-Komponenten.
// `base`: Grundlegende Stile, die auf alle Buttons angewendet werden, einschließlich Layout, Typografie, Fokus- und Deaktivierungszustände.
// `variants`: Definiert verschiedene visuelle Varianten (z.B. `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`) und Größen (`default`, `sm`, `lg`, `icon`).
// `defaultVariants`: Setzt die Standardvariante auf `default` und die Standardgröße auf `default`, wenn keine explizit angegeben wird.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90", // Standard-Button mit primärer Hintergrundfarbe und Textfarbe.
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90", // Destruktiver Button für Aktionen, die Vorsicht erfordern.
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground", // Outline-Button mit Rahmen und Akzentfarben bei Hover.
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80", // Sekundärer Button mit sekundärer Hintergrundfarbe und Textfarbe.
        ghost: "hover:bg-accent hover:text-accent-foreground", // Ghost-Button ohne Hintergrund, nur mit Hover-Effekt.
        link: "text-primary underline-offset-4 hover:underline", // Link-Button, der wie ein Textlink aussieht.
      },
      size: {
        default: "h-10 px-4 py-2", // Standardgröße mit fester Höhe und Padding.
        sm: "h-9 rounded-md px-3", // Kleine Größe.
        lg: "h-11 rounded-md px-8", // Große Größe.
        icon: "h-10 w-10", // Icon-Größe für quadratische Buttons.
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Definiert das Interface `ButtonProps`, das die HTML-Attribute für ein `HTMLButtonElement` und die Varianten-Props von `buttonVariants` kombiniert.
// `asChild`: Eine optionale Prop, die angibt, ob der Button als Child-Komponente gerendert werden soll, um Styling auf ein anderes Element anzuwenden.
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, // Standard-HTML-Attribute für einen Button.
    VariantProps<typeof buttonVariants> { // Varianten-Props, die von `buttonVariants` definiert werden.
  asChild?: boolean // Wenn true, wird das Kind als Slot gerendert, um Styling zu übertragen.
}

// Definiert die `Button`-Komponente.
// Sie akzeptiert `className`, `variant`, `size`, `asChild` und andere Props, die an das zugrunde liegende Button-Element weitergeleitet werden.
// `ref`: Wird an das zugrunde liegende Button-Element weitergeleitet, um direkten DOM-Zugriff zu ermöglichen.
// `Comp`: Bestimmt, ob ein `<button>`-Element oder ein `Slot`-Element gerendert wird, basierend auf der `asChild`-Prop. Dies ermöglicht flexible Komposition.
// `className`: Wendet die durch `buttonVariants` generierten Stile an, basierend auf der gewählten Variante, Größe und zusätzlichen Klassen.
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button" // Wählt die zu rendernde Komponente.
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))} // Wendet die generierten Klassen an.
        ref={ref} // Leitet die Referenz weiter.
        {...props} // Leitet alle weiteren Props weiter.
      />
    )
  }
)
// Setzt den Anzeigenamen für die `Button`-Komponente zur besseren Debugging-Erfahrung in den React DevTools.
Button.displayName = "Button"

// Exportiert die Komponenten `Button` und `buttonVariants` zur Verwendung in anderen Teilen der Anwendung.
export { Button, buttonVariants }
