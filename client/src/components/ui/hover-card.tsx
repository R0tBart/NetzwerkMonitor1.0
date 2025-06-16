"use client"

// Importiert React für die Komponentendefinition.
import * as React from "react"
// Importiert alle Komponenten von `@radix-ui/react-hover-card` als `HoverCardPrimitive`.
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

// Importiert die `cn`-Hilfsfunktion zum Zusammenführen von Klassennamen.
import { cn } from "@/lib/utils"

// Definiert die `HoverCard`-Komponente als Alias für `HoverCardPrimitive.Root`.
const HoverCard = HoverCardPrimitive.Root

// Definiert die `HoverCardTrigger`-Komponente als Alias für `HoverCardPrimitive.Trigger`.
const HoverCardTrigger = HoverCardPrimitive.Trigger

// Definiert die `HoverCardContent`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert den Inhalt der Hover Card.
// `className`: Zusätzliche CSS-Klassen.
// `align`: Ausrichtung des Inhalts (Standard: "center").
// `sideOffset`: Abstand zur Seite (Standard: 4).
const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-hover-card-content-transform-origin]",
      className
    )}
    {...props}
  />
))
// Setzt den Anzeigenamen für die `HoverCardContent`-Komponente.
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

// Exportiert die `HoverCard`, `HoverCardTrigger` und `HoverCardContent` Komponenten.
export { HoverCard, HoverCardTrigger, HoverCardContent }
