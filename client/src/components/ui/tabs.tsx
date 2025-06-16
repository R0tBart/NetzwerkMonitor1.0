// Importiert React für die Komponentendefinition.
import * as React from "react"

// Importiert die Tabs-Komponenten-Primitive von Radix UI.
import * as TabsPrimitive from "@radix-ui/react-tabs"

// Importiert eine Utility-Funktion zum Zusammenführen von Klassennamen.
import { cn } from "@/lib/utils"

// Definiert die Haupt-Tabs-Komponente, die direkt die Root-Komponente von Radix UI verwendet.
const Tabs = TabsPrimitive.Root

// Definiert die TabsList-Komponente, die eine Liste von Tab-Triggern enthält.
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>, // Typ des Referenzelements.
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> // Leitet alle Props des nativen List-Elements weiter.
>(({ className, ...props }, ref) => (
  // Rendert die List-Komponente von Radix UI.
  <TabsPrimitive.List
    ref={ref} // Leitet die Ref an das List-Element weiter.
    // Wendet Standardstile und zusätzliche, über `className` übergebene Stile an.
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props} // Leitet alle weiteren Props an die List-Komponente weiter.
  />
))
// Setzt den Display-Namen für die TabsList-Komponente, nützlich für Debugging in React DevTools.
TabsList.displayName = TabsPrimitive.List.displayName

// Definiert die TabsTrigger-Komponente, die als interaktiver Button für jeden Tab dient.
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>, // Typ des Referenzelements.
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> // Leitet alle Props des nativen Trigger-Elements weiter.
>(({ className, ...props }, ref) => (
  // Rendert die Trigger-Komponente von Radix UI.
  <TabsPrimitive.Trigger
    ref={ref} // Leitet die Ref an das Trigger-Element weiter.
    // Wendet Standardstile und zusätzliche, über `className` übergebene Stile an.
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props} // Leitet alle weiteren Props an die Trigger-Komponente weiter.
  />
))
// Setzt den Display-Namen für die TabsTrigger-Komponente, nützlich für Debugging in React DevTools.
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

// Definiert die TabsContent-Komponente, die den Inhalt für jeden Tab anzeigt.
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>, // Typ des Referenzelements.
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> // Leitet alle Props des nativen Content-Elements weiter.
>(({ className, ...props }, ref) => (
  // Rendert die Content-Komponente von Radix UI.
  <TabsPrimitive.Content
    ref={ref} // Leitet die Ref an das Content-Element weiter.
    // Wendet Standardstile und zusätzliche, über `className` übergebene Stile an.
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props} // Leitet alle weiteren Props an die Content-Komponente weiter.
  />
))
// Setzt den Display-Namen für die TabsContent-Komponente, nützlich für Debugging in React DevTools.
TabsContent.displayName = TabsPrimitive.Content.displayName

// Exportiert alle Tabs-Komponenten für die Verwendung in anderen Teilen der Anwendung.
export { Tabs, TabsList, TabsTrigger, TabsContent }
