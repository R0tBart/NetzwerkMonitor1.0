import * as React from "react"
// Importiert die Accordion-Komponenten von Radix UI.
import * as AccordionPrimitive from "@radix-ui/react-accordion"
// Importiert das ChevronDown-Icon von lucide-react.
import { ChevronDown } from "lucide-react"

// Importiert die Hilfsfunktion 'cn' für bedingtes Klassennamen-Styling.
import { cn } from "@/lib/utils"

// Definiert die Haupt-Accordion-Komponente, basierend auf AccordionPrimitive.Root.
const Accordion = AccordionPrimitive.Root

// Definiert ein einzelnes Accordion-Element.
const AccordionItem = React.forwardRef< // Verwendet React.forwardRef, um eine Referenz an das DOM-Element weiterzuleiten.
  React.ElementRef<typeof AccordionPrimitive.Item>, // Typ des referenzierten Elements.
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> // Props des AccordionPrimitive.Item.
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item // Rendert das Radix UI Accordion Item.
    ref={ref} // Leitet die Referenz weiter.
    className={cn("border-b", className)} // Fügt einen unteren Rand und weitere Klassen hinzu.
    {...props} // Leitet alle weiteren Props weiter.
  />
))
AccordionItem.displayName = "AccordionItem" // Setzt den Anzeigenamen für das AccordionItem zur besseren Debugging-Erfahrung.

// Definiert den Trigger zum Öffnen/Schließen des Accordion-Inhalts.
const AccordionTrigger = React.forwardRef< // Verwendet React.forwardRef, um eine Referenz an das DOM-Element weiterzuleiten.
  React.ElementRef<typeof AccordionPrimitive.Trigger>, // Typ des referenzierten Elements.
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> // Props des AccordionPrimitive.Trigger.
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex"> {/* Header für den Accordion-Trigger, der Flexbox verwendet. */}
    <AccordionPrimitive.Trigger // Rendert den Radix UI Accordion Trigger.
      ref={ref} // Leitet die Referenz weiter.
      className={cn( // Styling für den Trigger.
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180", // Grundlegendes Styling, Hover-Effekt und Rotation des Icons beim Öffnen.
        className
      )}
      {...props} // Leitet alle weiteren Props weiter.
    >
      {children} {/* Inhalt des Triggers (z.B. Titel). */}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" /> {/* Chevron-Icon, das sich beim Öffnen dreht. */}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName // Setzt den Anzeigenamen für den AccordionTrigger.

// Definiert den Inhalt, der beim Öffnen des Accordion angezeigt wird.
const AccordionContent = React.forwardRef< // Verwendet React.forwardRef, um eine Referenz an das DOM-Element weiterzuleiten.
  React.ElementRef<typeof AccordionPrimitive.Content>, // Typ des referenzierten Elements.
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> // Props des AccordionPrimitive.Content.
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content // Rendert den Radix UI Accordion Content.
    ref={ref} // Leitet die Referenz weiter.
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down" // Styling für den Inhalt, inklusive Übergängen für das Ein- und Ausblenden.
    {...props} // Leitet alle weiteren Props weiter.
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div> {/* Innerer Container für den Inhalt mit Padding. */}
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName // Setzt den Anzeigenamen für den AccordionContent

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } // Exportiert alle Accordion-Komponenten
