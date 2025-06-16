// Importiert React für die Komponentendefinition.
import * as React from "react"
// Importiert alle Komponenten von `@radix-ui/react-popover` als `PopoverPrimitive`.
import * as PopoverPrimitive from "@radix-ui/react-popover"

// Importiert die `cn`-Hilfsfunktion zum Zusammenführen von Klassennamen.
import { cn } from "@/lib/utils"

// Definiert die `Popover`-Komponente als Alias für `PopoverPrimitive.Root`.
const Popover = PopoverPrimitive.Root

// Definiert die `PopoverTrigger`-Komponente als Alias für `PopoverPrimitive.Trigger`.
const PopoverTrigger = PopoverPrimitive.Trigger

// Definiert die `PopoverContent`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert den Inhalt des Popovers.
// `className`: Zusätzliche CSS-Klassen.
// `align`: Ausrichtung des Inhalts (Standard: "center").
// `sideOffset`: Abstand zur Seite (Standard: 4).
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-popover-content-transform-origin]",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
// Setzt den Anzeigenamen für die `PopoverContent`-Komponente.
PopoverContent.displayName = PopoverPrimitive.Content.displayName

// Exportiert die `Popover`, `PopoverTrigger` und `PopoverContent` Komponenten.
export { Popover, PopoverTrigger, PopoverContent }
