// Importiert React für die Komponentendefinition.
import * as React from "react"
// Importiert den Typ `DialogProps` von `@radix-ui/react-dialog`.
import { type DialogProps } from "@radix-ui/react-dialog"
// Importiert `Command` als `CommandPrimitive` von `cmdk` für die Befehlspalettenfunktionalität.
import { Command as CommandPrimitive } from "cmdk"
// Importiert das `Search`-Icon von `lucide-react`.
import { Search } from "lucide-react"

// Importiert die `cn`-Hilfsfunktion zum Konditionalen Zusammenführen von Klassennamen.
import { cn } from "@/lib/utils"
// Importiert die `Dialog` und `DialogContent` Komponenten aus der lokalen UI-Bibliothek.
import { Dialog, DialogContent } from "@/components/ui/dialog"

// Definiert die `Command`-Komponente, die ein `CommandPrimitive`-Element rendert.
// Sie akzeptiert `className` und andere Props.
// `ref`: Wird an das zugrunde liegende `CommandPrimitive`-Element weitergeleitet.
// `className`: Wendet grundlegende Stile für die Befehlspalette an, wie Layout, Hintergrund, Textfarbe und abgerundete Ecken.
const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props}
  />
))
// Setzt den Anzeigenamen für die `Command`-Komponente.
Command.displayName = CommandPrimitive.displayName

// Definiert die `CommandDialog`-Komponente, die eine Befehlspalette in einem Dialog rendert.
// Sie akzeptiert `children` und `DialogProps`.
// `Dialog` und `DialogContent` werden verwendet, um die Befehlspalette als modales Dialogfeld darzustellen.
const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        {/* Die `Command`-Komponente innerhalb des Dialogs mit spezifischen Styling-Regeln für cmdk-Elemente. */}
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

// Definiert die `CommandInput`-Komponente, die ein `CommandPrimitive.Input`-Element rendert.
// Sie akzeptiert `className` und andere Props.
// `ref`: Wird an das zugrunde liegende `CommandPrimitive.Input`-Element weitergeleitet.
// `className`: Wendet Stile für das Eingabefeld an, wie Höhe, Breite, Hintergrund, Textfarbe und Platzhalter-Text.
const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    {/* Rendert das `Search`-Icon neben dem Eingabefeld. */}
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))

// Setzt den Anzeigenamen für die `CommandInput`-Komponente.
CommandInput.displayName = CommandPrimitive.Input.displayName

// Definiert die `CommandList`-Komponente, die ein `CommandPrimitive.List`-Element rendert.
// Sie akzeptiert `className` und andere Props.
// `ref`: Wird an das zugrunde liegende `CommandPrimitive.List`-Element weitergeleitet.
// `className`: Wendet Stile für die Liste der Befehle an, wie maximale Höhe und Scrollverhalten.
const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
))

// Setzt den Anzeigenamen für die `CommandList`-Komponente.
CommandList.displayName = CommandPrimitive.List.displayName

// Definiert die `CommandEmpty`-Komponente, die ein `CommandPrimitive.Empty`-Element rendert.
// Sie akzeptiert `props` und `ref`.
// `ref`: Wird an das zugrunde liegende `CommandPrimitive.Empty`-Element weitergeleitet.
// `className`: Wendet Stile für den leeren Zustand der Befehlspalette an.
const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
))

// Setzt den Anzeigenamen für die `CommandEmpty`-Komponente.
CommandEmpty.displayName = CommandPrimitive.Empty.displayName

// Definiert die `CommandGroup`-Komponente, die ein `CommandPrimitive.Group`-Element rendert.
// Sie akzeptiert `className` und andere Props.
// `ref`: Wird an das zugrunde liegende `CommandPrimitive.Group`-Element weitergeleitet.
// `className`: Wendet Stile für eine Gruppe von Befehlen an, einschließlich Überschriften-Styling.
const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
))

// Setzt den Anzeigenamen für die `CommandGroup`-Komponente.
CommandGroup.displayName = CommandPrimitive.Group.displayName

// Definiert die `CommandSeparator`-Komponente, die ein `CommandPrimitive.Separator`-Element rendert.
// Sie akzeptiert `className` und andere Props.
// `ref`: Wird an das zugrunde liegende `CommandPrimitive.Separator`-Element weitergeleitet.
// `className`: Wendet Stile für einen Trennstrich in der Befehlspalette an.
const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
))
// Setzt den Anzeigenamen für die `CommandSeparator`-Komponente.
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

// Definiert die `CommandItem`-Komponente, die ein `CommandPrimitive.Item`-Element rendert.
// Sie akzeptiert `className` und andere Props.
// `ref`: Wird an das zugrunde liegende `CommandPrimitive.Item`-Element weitergeleitet.
// `className`: Wendet Stile für ein einzelnes Befehlselement an, einschließlich Hover-, Auswahl- und Deaktivierungszustände.
const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    )}
    {...props}
  />
))

// Setzt den Anzeigenamen für die `CommandItem`-Komponente.
CommandItem.displayName = CommandPrimitive.Item.displayName

// Definiert die `CommandShortcut`-Komponente, die ein `span`-Element rendert.
// Sie akzeptiert `className` und andere HTML-Attribute.
// `className`: Wendet Stile für Tastenkombinationen an, wie Textgröße, Buchstabenabstand und Farbe.
const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
// Setzt den Anzeigenamen für die `CommandShortcut`-Komponente.
CommandShortcut.displayName = "CommandShortcut"

// Exportiert alle Command-bezogenen Komponenten zur Verwendung in anderen Teilen der Anwendung.
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
