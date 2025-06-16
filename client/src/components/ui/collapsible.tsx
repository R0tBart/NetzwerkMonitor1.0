"use client"

// Importiert alle Exporte von `@radix-ui/react-collapsible` als `CollapsiblePrimitive`.
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

// Definiert die `Collapsible`-Komponente als Alias für `CollapsiblePrimitive.Root`.
const Collapsible = CollapsiblePrimitive.Root

// Definiert die `CollapsibleTrigger`-Komponente als Alias für `CollapsiblePrimitive.CollapsibleTrigger`.
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

// Definiert die `CollapsibleContent`-Komponente als Alias für `CollapsiblePrimitive.CollapsibleContent`.
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

// Exportiert die Komponenten `Collapsible`, `CollapsibleTrigger` und `CollapsibleContent` zur Verwendung in anderen Teilen der Anwendung.
export { Collapsible, CollapsibleTrigger, CollapsibleContent }
