"use client"

// Importiert React für die Komponentendefinition.
import * as React from "react"
// Importiert alle Exporte von `@radix-ui/react-avatar` als `AvatarPrimitive`.
import * as AvatarPrimitive from "@radix-ui/react-avatar"

// Importiert die `cn`-Hilfsfunktion zum Konditionalen Zusammenführen von Klassennamen.
import { cn } from "@/lib/utils"

// Definiert die `Avatar`-Komponente, die ein `AvatarPrimitive.Root`-Element rendert.
// Sie akzeptiert `className` und andere Props.
// `ref`: Wird an das zugrunde liegende `div`-Element weitergeleitet.
// `className`: Wendet grundlegende Stile für den Avatar-Container an, wie Größe, Form und Überlaufverhalten.
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
// Setzt den Anzeigenamen für die `Avatar`-Komponente.
Avatar.displayName = AvatarPrimitive.Root.displayName

// Definiert die `AvatarImage`-Komponente, die ein `AvatarPrimitive.Image`-Element rendert.
// Sie akzeptiert `className` und andere Props.
// `ref`: Wird an das zugrunde liegende `img`-Element weitergeleitet.
// `className`: Wendet Stile an, um sicherzustellen, dass das Bild das gesamte Avatar-Feld ausfüllt und das Seitenverhältnis beibehält.
// Definiert die `AvatarImage`-Komponente, die ein `AvatarPrimitive.Image`-Element rendert.
// Sie akzeptiert `className` und andere Props, die an ein `img`-Element weitergegeben werden können.
// `ref`: Wird an das zugrunde liegende `img`-Element weitergeleitet, um direkten DOM-Zugriff zu ermöglichen.
// `className`: Wendet Stile an, um sicherzustellen, dass das Bild das gesamte Avatar-Feld ausfüllt und das Seitenverhältnis beibehält.
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>, // Der Typ des referenzierten HTML-Elements (Image).
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> // Die Props, die die Komponente akzeptiert.
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref} // Leitet die Referenz weiter.
    className={cn("aspect-square h-full w-full", className)} // Wendet Klassen für Seitenverhältnis und Größe an.
    {...props} // Leitet alle weiteren Props weiter.
  />
))
// Setzt den Anzeigenamen für die `AvatarImage`-Komponente.
AvatarImage.displayName = AvatarPrimitive.Image.displayName



// Exportiert die Avatar-Komponenten zur Verwendung in anderen Teilen der Anwendung.

// Setzt den Anzeigenamen für die `AvatarImage`-Komponente.
AvatarImage.displayName = AvatarPrimitive.Image.displayName

// Definiert die `AvatarFallback`-Komponente, die ein `AvatarPrimitive.Fallback`-Element rendert.
// Sie akzeptiert `className` und andere Props.
// `ref`: Wird an das zugrunde liegende `div`-Element weitergeleitet.
// `className`: Wendet Stile an, um einen Fallback-Platzhalter (z.B. Initialen oder ein generisches Symbol) zu zentrieren und zu stylen.
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
// Setzt den Anzeigenamen für die `AvatarFallback`-Komponente.
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

// Exportiert die Komponenten `Avatar`, `AvatarImage` und `AvatarFallback` zur Verwendung in anderen Teilen der Anwendung.
export { Avatar, AvatarImage, AvatarFallback }
