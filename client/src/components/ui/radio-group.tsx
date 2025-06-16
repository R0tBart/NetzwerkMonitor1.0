// Importiert React für die Komponentendefinition.
import * as React from "react"
// Importiert alle Komponenten von `@radix-ui/react-radio-group` als `RadioGroupPrimitive`.
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
// Importiert das `Circle`-Icon von `lucide-react`.
import { Circle } from "lucide-react"

// Importiert die `cn`-Hilfsfunktion zum Zusammenführen von Klassennamen.
import { cn } from "@/lib/utils"

// Definiert die `RadioGroup`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert eine Gruppe von Radio-Buttons.
// `className`: Zusätzliche CSS-Klassen.
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
// Setzt den Anzeigenamen für die `RadioGroup`-Komponente.
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

// Definiert die `RadioGroupItem`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert einen einzelnen Radio-Button.
// `className`: Zusätzliche CSS-Klassen.
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
// Setzt den Anzeigenamen für die `RadioGroupItem`-Komponente.
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

// Exportiert die `RadioGroup` und `RadioGroupItem` Komponenten.
export { RadioGroup, RadioGroupItem }
