// Importiert React für die Komponentendefinition und Typen.
import * as React from "react"

// Importiert die `cn`-Hilfsfunktion zum Konditionalen Zusammenführen von Klassennamen, nützlich für Tailwind CSS.
import { cn } from "@/lib/utils"

// Definiert die `Card`-Komponente, die als Container für Inhalte dient und ein `div`-Element rendert.
// `className`: Zusätzliche CSS-Klassen, die auf den Hauptcontainer der Karte angewendet werden.
// `ref`: Eine Referenz, die an das zugrunde liegende `div`-Element weitergeleitet wird.
// `...props`: Alle weiteren HTML-Attribute, die an das `div`-Element übergeben werden.
// Grundlegende Stile für die Karte umfassen abgerundete Ecken, einen Rahmen, Hintergrund- und Textfarben sowie einen Schatten.
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
// Setzt den Anzeigenamen für die `Card`-Komponente zur besseren Debugging-Erfahrung in den React DevTools.
Card.displayName = "Card"

// Definiert die `CardHeader`-Komponente, die den Kopfbereich einer Karte darstellt und ein `div`-Element rendert.
// `className`: Zusätzliche CSS-Klassen, die auf den Header angewendet werden.
// `ref`: Eine Referenz, die an das zugrunde liegende `div`-Element weitergeleitet wird.
// `...props`: Alle weiteren HTML-Attribute, die an das `div`-Element übergeben werden.
// Stile für den Kartenkopf umfassen ein Flex-Layout, vertikalen Abstand und Padding.
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
// Setzt den Anzeigenamen für die `CardHeader`-Komponente.
CardHeader.displayName = "CardHeader"

// Definiert die `CardTitle`-Komponente, die den Titel einer Karte darstellt und ein `div`-Element rendert.
// `className`: Zusätzliche CSS-Klassen, die auf den Titel angewendet werden.
// `ref`: Eine Referenz, die an das zugrunde liegende `div`-Element weitergeleitet wird.
// `...props`: Alle weiteren HTML-Attribute, die an das `div`-Element übergeben werden.
// Stile für den Kartentitel umfassen Schriftgröße, -gewicht, Zeilenhöhe und Buchstabenabstand.
const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
// Setzt den Anzeigenamen für die `CardTitle`-Komponente.
CardTitle.displayName = "CardTitle"

// Definiert die `CardDescription`-Komponente, die eine Beschreibung oder Untertitel einer Karte darstellt und ein `div`-Element rendert.
// `className`: Zusätzliche CSS-Klassen, die auf die Beschreibung angewendet werden.
// `ref`: Eine Referenz, die an das zugrunde liegende `div`-Element weitergeleitet wird.
// `...props`: Alle weiteren HTML-Attribute, die an das `div`-Element übergeben werden.
// Stile für die Kartenbeschreibung umfassen Textgröße und -farbe.
const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
// Setzt den Anzeigenamen für die `CardDescription`-Komponente.
CardDescription.displayName = "CardDescription"

// Definiert die `CardContent`-Komponente, die den Hauptinhalt einer Karte darstellt und ein `div`-Element rendert.
// `className`: Zusätzliche CSS-Klassen, die auf den Inhalt angewendet werden.
// `ref`: Eine Referenz, die an das zugrunde liegende `div`-Element weitergeleitet wird.
// `...props`: Alle weiteren HTML-Attribute, die an das `div`-Element übergeben werden.
// Stile für den Karteninhalt umfassen Padding.
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
// Setzt den Anzeigenamen für die `CardContent`-Komponente.
CardContent.displayName = "CardContent"

// Definiert die `CardFooter`-Komponente, die den Fußbereich einer Karte darstellt und ein `div`-Element rendert.
// `className`: Zusätzliche CSS-Klassen, die auf den Footer angewendet werden.
// `ref`: Eine Referenz, die an das zugrunde liegende `div`-Element weitergeleitet wird.
// `...props`: Alle weiteren HTML-Attribute, die an das `div`-Element übergeben werden.
// Stile für den Kartenfuß umfassen ein Flex-Layout, Ausrichtung und Padding.
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
// Setzt den Anzeigenamen für die `CardFooter`-Komponente zur besseren Debugging-Erfahrung in den React DevTools.
CardFooter.displayName = "CardFooter"

// Exportiert alle Card-Komponenten zur Verwendung in anderen Teilen der Anwendung.
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
}
