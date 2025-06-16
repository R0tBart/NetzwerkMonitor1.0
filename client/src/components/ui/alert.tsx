// Importiert React für die Komponentendefinition.
import * as React from "react"
// Importiert `cva` und `VariantProps` von `class-variance-authority` für die Definition von Stilvarianten.
import { cva, type VariantProps } from "class-variance-authority"

// Importiert die `cn`-Hilfsfunktion zum Konditionalen Zusammenführen von Klassennamen.
import { cn } from "@/lib/utils"

// Definiert die `alertVariants` mit `cva` für verschiedene Stilvarianten von Alert-Komponenten.
// `base`: Grundlegende Stile für die Alert-Box, die immer angewendet werden.
// `variants`: Definiert verschiedene visuelle Varianten (z.B. `default`, `destructive`).
// `defaultVariants`: Setzt die Standardvariante auf `default`, wenn keine Variante explizit angegeben wird.
const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground", // Standard-Variante mit Hintergrund- und Textfarbe.
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive", // Destruktive Variante mit spezifischen Farben und Rändern.
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// Definiert die `Alert`-Komponente, die ein `div`-Element rendert und verschiedene Stilvarianten unterstützt.
// Sie akzeptiert `className`, `variant` und andere HTML-Attribute, die an ein `div`-Element weitergegeben werden können.
// `ref`: Wird an das zugrunde liegende `div`-Element weitergeleitet, um direkten DOM-Zugriff zu ermöglichen.
// `role="alert"`: Semantische Rolle für Barrierefreiheit, um Screenreadern die Bedeutung des Elements zu vermitteln.
// `className`: Wendet die durch `alertVariants` generierten Stile an, basierend auf der gewählten Variante und zusätzlichen Klassen.
const Alert = React.forwardRef<
  HTMLDivElement, // Der Typ des referenzierten HTML-Elements.
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants> // Die Props, die die Komponente akzeptiert, inklusive HTML-Attribute und Varianten-Props.
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref} // Leitet die Referenz weiter.
    role="alert" // Setzt die ARIA-Rolle.
    className={cn(alertVariants({ variant }), className)} // Wendet die generierten Klassen an.
    {...props} // Leitet alle weiteren Props weiter.
  />
))
// Setzt den Anzeigenamen für die `Alert`-Komponente zur besseren Debugging-Erfahrung in den React DevTools.
Alert.displayName = "Alert"

// Definiert die `AlertTitle`-Komponente, die ein `h5`-Element rendert und den Titel des Alerts darstellt.
// Sie akzeptiert `className` und andere HTML-Attribute, die an ein `h5`-Element weitergegeben werden können.
// `ref`: Wird an das zugrunde liegende `h5`-Element weitergeleitet.
// `className`: Wendet grundlegende Typografie-Stile an und ermöglicht zusätzliche Klassen.
const AlertTitle = React.forwardRef<
  HTMLParagraphElement, // Der Typ des referenzierten HTML-Elements (hier ein Paragraph, obwohl es ein h5 ist, was auf eine Typ-Diskrepanz hindeuten könnte).
  React.HTMLAttributes<HTMLHeadingElement> // Die Props, die die Komponente akzeptiert, inklusive HTML-Attribute für Überschriften.
>(({ className, ...props }, ref) => (
  <h5
    ref={ref} // Leitet die Referenz weiter.
    className={cn("mb-1 font-medium leading-none tracking-tight", className)} // Wendet grundlegende Typografie-Stile an.
    {...props} // Leitet alle weiteren Props weiter.
  />
))
// Setzt den Anzeigenamen für die `AlertTitle`-Komponente.
AlertTitle.displayName = "AlertTitle"

// Definiert die `AlertDescription`-Komponente, die einen `div`-Element rendert und die Beschreibung des Alerts darstellt.
// Sie akzeptiert `className` und andere HTML-Attribute, die an ein `div`-Element weitergegeben werden können.
// `ref`: Wird an das zugrunde liegende `div`-Element weitergeleitet.
// `className`: Wendet grundlegende Typografie-Stile an und ermöglicht zusätzliche Klassen.
const AlertDescription = React.forwardRef<
  HTMLParagraphElement, // Der Typ des referenzierten HTML-Elements.
  React.HTMLAttributes<HTMLParagraphElement> // Die Props, die die Komponente akzeptiert.
>(({ className, ...props }, ref) => (
  <div
    ref={ref} // Leitet die Referenz weiter.
    className={cn("text-sm [&_p]:leading-relaxed", className)} // Wendet grundlegende Typografie-Stile an.
    {...props} // Leitet alle weiteren Props weiter.
  />
))
// Setzt den Anzeigenamen für die `AlertDescription`-Komponente.
AlertDescription.displayName = "AlertDescription"

// Exportiert die Alert-Komponenten und ihre Varianten für die Verwendung in anderen Teilen der Anwendung.
export {
  Alert,
  AlertTitle,
  AlertDescription,
  alertVariants
}
