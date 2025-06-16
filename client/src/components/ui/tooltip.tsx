"use client"
// Importiert React für die Komponentendefinition.
import * as React from "react"
// Importiert die Tooltip-Komponenten-Primitive von Radix UI.
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

// Importiert eine Utility-Funktion zum Zusammenführen von Klassennamen.
import { cn } from "@/lib/utils"

// Definiert den TooltipProvider, der den Kontext für alle Tooltip-Komponenten bereitstellt.
const TooltipProvider = TooltipPrimitive.Provider

// Definiert die Tooltip-Komponente, die direkt die Root-Komponente von Radix UI verwendet.
const Tooltip = TooltipPrimitive.Root

// Definiert die TooltipTrigger-Komponente, die das Element ist, das den Tooltip auslöst.
const TooltipTrigger = TooltipPrimitive.Trigger

// Definiert die TooltipContent-Komponente, die den Inhalt des Tooltips anzeigt.
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>, // Typ des Referenzelements.
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> // Leitet alle Props des nativen Content-Elements weiter.
>(({ className, sideOffset = 4, ...props }, ref) => (
  // Rendert die Content-Komponente von Radix UI.
  <TooltipPrimitive.Content
    ref={ref} // Leitet die Ref an das Content-Element weiter.
    sideOffset={sideOffset} // Definiert den Abstand des Tooltips zum Trigger-Element.
    // Wendet Standardstile und zusätzliche, über `className` übergebene Stile an.
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]",
      className
    )}
    {...props} // Leitet alle weiteren Props an die Content-Komponente weiter.
  />
))
// Setzt den Display-Namen für die TooltipContent-Komponente, nützlich für Debugging in React DevTools.
TooltipContent.displayName = TooltipPrimitive.Content.displayName

// Exportiert alle Tooltip-Komponenten für die Verwendung in anderen Teilen der Anwendung.
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
