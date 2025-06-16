import * as React from "react"
// Importiert alle Komponenten von Radix UI Context Menu als `ContextMenuPrimitive`.
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
// Importiert Icons von `lucide-react`.
import { Check, ChevronRight, Circle } from "lucide-react"

// Importiert die `cn`-Hilfsfunktion zum Zusammenführen von Klassennamen.
import { cn } from "@/lib/utils"

// Definiert die `ContextMenu`-Komponente als Alias für `ContextMenuPrimitive.Root`.
const ContextMenu = ContextMenuPrimitive.Root

// Definiert die `ContextMenuTrigger`-Komponente als Alias für `ContextMenuPrimitive.Trigger`.
const ContextMenuTrigger = ContextMenuPrimitive.Trigger

// Definiert die `ContextMenuGroup`-Komponente als Alias für `ContextMenuPrimitive.Group`.
const ContextMenuGroup = ContextMenuPrimitive.Group

// Definiert die `ContextMenuPortal`-Komponente als Alias für `ContextMenuPrimitive.Portal`.
const ContextMenuPortal = ContextMenuPrimitive.Portal

// Definiert die `ContextMenuSub`-Komponente als Alias für `ContextMenuPrimitive.Sub`.
const ContextMenuSub = ContextMenuPrimitive.Sub

// Definiert die `ContextMenuRadioGroup`-Komponente als Alias für `ContextMenuPrimitive.RadioGroup`.
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

// Definiert die `ContextMenuSubTrigger`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert `ContextMenuPrimitive.SubTrigger`.
// `className`: Zusätzliche CSS-Klassen.
// `inset`: Boolescher Wert, der bestimmt, ob ein linker Einzug hinzugefügt werden soll.
// `children`: Die Kind-Elemente, die im Trigger gerendert werden sollen.
const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    {/* Zeigt ein Chevron-Rechts-Icon an. */}
    <ChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
))
// Setzt den Anzeigenamen für die `ContextMenuSubTrigger`-Komponente.
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName

// Definiert die `ContextMenuSubContent`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert `ContextMenuPrimitive.SubContent`.
// `className`: Zusätzliche CSS-Klassen für das Styling des Untermenü-Inhalts.
const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-context-menu-content-transform-origin]",
      className
    )}
    {...props}
  />
))
// Setzt den Anzeigenamen für die `ContextMenuSubContent`-Komponente.
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName

// Definiert die `ContextMenuContent`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert `ContextMenuPrimitive.Content` innerhalb eines `ContextMenuPrimitive.Portal`.
// `className`: Zusätzliche CSS-Klassen für das Styling des Menü-Inhalts.
const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 max-h-[--radix-context-menu-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-context-menu-content-transform-origin]",
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
))
// Setzt den Anzeigenamen für die `ContextMenuContent`-Komponente.
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName

// Definiert die `ContextMenuItem`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert `ContextMenuPrimitive.Item`.
// `className`: Zusätzliche CSS-Klassen.
// `inset`: Boolescher Wert, der bestimmt, ob ein linker Einzug hinzugefügt werden soll.
const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
// Setzt den Anzeigenamen für die `ContextMenuItem`-Komponente.
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

// Definiert die `ContextMenuCheckboxItem`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert `ContextMenuPrimitive.CheckboxItem`.
// `className`: Zusätzliche CSS-Klassen.
// `children`: Die Kind-Elemente, die im Checkbox-Item gerendert werden sollen.
// `checked`: Der aktuelle Checked-Zustand des Checkbox-Items.
const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    {/* Zeigt ein Häkchen-Icon an, wenn das Element ausgewählt ist. */}
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
))
// Setzt den Anzeigenamen für die `ContextMenuCheckboxItem`-Komponente.
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName

// Definiert die `ContextMenuRadioItem`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert `ContextMenuPrimitive.RadioItem`.
// `className`: Zusätzliche CSS-Klassen.
// `children`: Die Kind-Elemente, die im Radio-Item gerendert werden sollen.
const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    {/* Zeigt einen Kreis an, wenn das Element ausgewählt ist. */}
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
))
// Setzt den Anzeigenamen für die `ContextMenuRadioItem`-Komponente.
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName

// Definiert die `ContextMenuLabel`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert `ContextMenuPrimitive.Label`.
// `className`: Zusätzliche CSS-Klassen.
// `inset`: Boolescher Wert, der bestimmt, ob ein linker Einzug hinzugefügt werden soll.
const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold text-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
// Setzt den Anzeigenamen für die `ContextMenuLabel`-Komponente.
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName

// Definiert die `ContextMenuSeparator`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert `ContextMenuPrimitive.Separator`.
// `className`: Zusätzliche CSS-Klassen für den Separator.
const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
))
// Setzt den Anzeigenamen für die `ContextMenuSeparator`-Komponente.
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName

// Definiert die `ContextMenuShortcut`-Komponente.
// Sie akzeptiert `className` und andere HTML-Attribute.
// `className`: Wendet Stile für Tastenkombinationen an, wie Textgröße, Buchstabenabstand und Farbe.
const ContextMenuShortcut = ({
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
// Setzt den Anzeigenamen für die `ContextMenuShortcut`-Komponente.
ContextMenuShortcut.displayName = "ContextMenuShortcut"

// Exportiert alle ContextMenu-bezogenen Komponenten zur Verwendung in anderen Teilen der Anwendung.
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}


