// Importiert React für die Komponentendefinition und Typen.
import * as React from "react"
// Importiert `Slot` von `@radix-ui/react-slot` für flexible Komponentenzusammensetzung.
import { Slot } from "@radix-ui/react-slot"
// Importiert Icons von `lucide-react`.
import { ChevronRight, MoreHorizontal } from "lucide-react"

// Importiert die `cn`-Hilfsfunktion zum Konditionalen Zusammenführen von Klassennamen.
import { cn } from "@/lib/utils"

// Definiert die `Breadcrumb`-Komponente, die ein `nav`-Element rendert.
// Sie akzeptiert Standard-HTML-Navigationsattribute und eine optionale `separator`-Prop.
// `ref`: Wird an das zugrunde liegende `nav`-Element weitergeleitet.
// `aria-label="breadcrumb"`: Semantische Rolle für Barrierefreiheit.
const Breadcrumb = React.forwardRef<
  HTMLElement, // Der Typ des referenzierten HTML-Elements.
  React.ComponentPropsWithoutRef<"nav"> & { // Standard-HTML-Attribute für ein nav-Element.
    separator?: React.ReactNode // Optionale Prop für ein benutzerdefiniertes Trennzeichen.
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />)
// Setzt den Anzeigenamen für die `Breadcrumb`-Komponente.
Breadcrumb.displayName = "Breadcrumb"

// Definiert die `BreadcrumbList`-Komponente, die ein `ol`-Element rendert.
// Sie akzeptiert `className` und andere Props, die an ein `ol`-Element weitergeleitet werden können.
// `ref`: Wird an das zugrunde liegende `ol`-Element weitergeleitet.
// `className`: Wendet Stile für die Liste der Breadcrumb-Elemente an.
const BreadcrumbList = React.forwardRef<
  HTMLOListElement, // Der Typ des referenzierten HTML-Elements.
  React.ComponentPropsWithoutRef<"ol"> // Standard-HTML-Attribute für ein ol-Element.
>(({ className, ...props }, ref) => (
  <ol
    ref={ref} // Leitet die Referenz weiter.
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    )} // Wendet Klassen für Layout und Text an.
    {...props} // Leitet alle weiteren Props weiter.
  />
))
// Setzt den Anzeigenamen für die `BreadcrumbList`-Komponente.
BreadcrumbList.displayName = "BreadcrumbList"

// Definiert die `BreadcrumbItem`-Komponente, die ein `li`-Element rendert.
// Sie akzeptiert `className` und andere Props, die an ein `li`-Element weitergeleitet werden können.
// `ref`: Wird an das zugrunde liegende `li`-Element weitergeleitet.
// `className`: Wendet Stile für einzelne Breadcrumb-Elemente an.
const BreadcrumbItem = React.forwardRef<
  HTMLLIElement, // Der Typ des referenzierten HTML-Elements.
  React.ComponentPropsWithoutRef<"li"> // Standard-HTML-Attribute für ein li-Element.
>(({ className, ...props }, ref) => (
  <li
    ref={ref} // Leitet die Referenz weiter.
    className={cn("inline-flex items-center gap-1.5", className)} // Wendet Klassen für Inline-Layout an.
    {...props} // Leitet alle weiteren Props weiter.
  />
))
// Setzt den Anzeigenamen für die `BreadcrumbItem`-Komponente.
BreadcrumbItem.displayName = "BreadcrumbItem"

// Definiert die `BreadcrumbLink`-Komponente, die einen Link in der Breadcrumb-Navigation darstellt.
// Sie kann entweder ein `a`-Element oder eine andere Komponente rendern, wenn `asChild` true ist.
// `ref`: Wird an das zugrunde liegende Element weitergeleitet.
// `className`: Wendet Stile für den Link an, inklusive Hover-Effekte.
const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement, // Der Typ des referenzierten HTML-Elements.
  React.ComponentPropsWithoutRef<"a"> & { // Standard-HTML-Attribute für ein a-Element.
    asChild?: boolean // Wenn true, wird das Kind als Slot gerendert.
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a" // Wählt die zu rendernde Komponente basierend auf `asChild`.

  return (
    <Comp
      ref={ref} // Leitet die Referenz weiter.
      className={cn("transition-colors hover:text-foreground", className)} // Wendet Klassen für Übergänge und Hover-Effekte an.
      {...props} // Leitet alle weiteren Props weiter.
    />
  )
})
// Setzt den Anzeigenamen für die `BreadcrumbLink`-Komponente.
BreadcrumbLink.displayName = "BreadcrumbLink"

// Definiert die `BreadcrumbPage`-Komponente, die die aktuelle Seite in der Breadcrumb-Navigation darstellt.
// Sie rendert ein `span`-Element und ist für Barrierefreiheit als Link mit `aria-disabled` und `aria-current` markiert.
// `ref`: Wird an das zugrunde liegende `span`-Element weitergeleitet.
// `className`: Wendet Stile für den Text der aktuellen Seite an.
const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement, // Der Typ des referenzierten HTML-Elements.
  React.ComponentPropsWithoutRef<"span"> // Standard-HTML-Attribute für ein span-Element.
>(({ className, ...props }, ref) => (
  <span
    ref={ref} // Leitet die Referenz weiter.
    role="link" // Semantische Rolle für Barrierefreiheit.
    aria-disabled="true" // Zeigt an, dass das Element deaktiviert ist.
    aria-current="page" // Zeigt an, dass dies die aktuelle Seite ist.
    className={cn("font-normal text-foreground", className)} // Wendet Klassen für Schriftart und Textfarbe an.
    {...props} // Leitet alle weiteren Props weiter.
  />
))
// Setzt den Anzeigenamen für die `BreadcrumbPage`-Komponente.
BreadcrumbPage.displayName = "BreadcrumbPage"

// Definiert die `BreadcrumbSeparator`-Komponente, die ein Trennzeichen zwischen Breadcrumb-Elementen darstellt.
// Standardmäßig rendert sie ein `ChevronRight`-Icon, kann aber auch benutzerdefinierte Kinder annehmen.
// `role="presentation"`: Versteckt das Element vor Screenreadern, da es rein dekorativ ist.
// `aria-hidden="true"`: Versteckt das Element ebenfalls vor Screenreadern.
// `className`: Wendet Stile auf das Trennzeichen an, insbesondere auf das SVG-Icon.
const BreadcrumbSeparator = ({
  children, // Optionale Kinder, die als Trennzeichen gerendert werden.
  className, // Zusätzliche Klassen.
  ...props // Weitere Props, die an das li-Element weitergeleitet werden.
}: React.ComponentProps<"li">) => (
  <li
    role="presentation" // Semantische Rolle für Barrierefreiheit.
    aria-hidden="true" // Versteckt das Element vor Screenreadern.
    className={cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className)} // Wendet Klassen auf das SVG-Icon an.
    {...props} // Leitet alle weiteren Props weiter.
  >
    {children ?? <ChevronRight />} // Rendert Kinder oder das Standard-Icon.
  </li>
)
// Setzt den Anzeigenamen für die `BreadcrumbSeparator`-Komponente.
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

// Definiert die `BreadcrumbEllipsis`-Komponente, die eine Auslassungspunkte (...) in der Breadcrumb-Navigation darstellt.
// Sie wird verwendet, um ausgelassene Breadcrumb-Elemente anzuzeigen.
// `role="presentation"`: Versteckt das Element vor Screenreadern.
// `aria-hidden="true"`: Versteckt das Element ebenfalls vor Screenreadern.
// `className`: Wendet Stile für die Positionierung und Größe der Auslassungspunkte an.
const BreadcrumbEllipsis = ({
  className, // Zusätzliche Klassen.
  ...props // Weitere Props, die an das span-Element weitergeleitet werden.
}: React.ComponentProps<"span">) => (
  <span
    role="presentation" // Semantische Rolle für Barrierefreiheit.
    aria-hidden="true" // Versteckt das Element vor Screenreadern.
    className={cn("flex h-9 w-9 items-center justify-center", className)} // Wendet Klassen für Layout und Größe an.
    {...props} // Leitet alle weiteren Props weiter.
  >
    <MoreHorizontal className="h-4 w-4" /> // Rendert das MoreHorizontal-Icon.
    <span className="sr-only">More</span>
  </span>
)
// Setzt den Anzeigenamen für die `BreadcrumbEllipsis`-Komponente.
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

// Exportiert alle Breadcrumb-Komponenten zur Verwendung in anderen Teilen der Anwendung.
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
