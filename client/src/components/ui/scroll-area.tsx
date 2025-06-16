// Importiert React für die Komponentendefinition.
import * as React from "react"
// Importiert alle Komponenten von `@radix-ui/react-scroll-area` als `ScrollAreaPrimitive`.
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

// Importiert die `cn`-Hilfsfunktion zum Zusammenführen von Klassennamen.
import { cn } from "@/lib/utils"

// Definiert die `ScrollArea`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert einen Scrollbereich.
// `className`: Zusätzliche CSS-Klassen.
// `children`: Die Kindelemente, die im Scrollbereich gerendert werden sollen.
const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
// Setzt den Anzeigenamen für die `ScrollArea`-Komponente.
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

// Definiert die `ScrollBar`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert eine Scrollleiste.
// `className`: Zusätzliche CSS-Klassen.
// `orientation`: Ausrichtung der Scrollleiste (Standard: "vertical").
const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
// Setzt den Anzeigenamen für die `ScrollBar`-Komponente.
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

// Exportiert die `ScrollArea` und `ScrollBar` Komponenten.
export { ScrollArea, ScrollBar }
