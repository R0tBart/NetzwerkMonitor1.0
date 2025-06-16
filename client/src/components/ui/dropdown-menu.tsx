import * as React from "react"
// Importiert alle Komponenten von Radix UI Dropdown Menu als `DropdownMenuPrimitive`.
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
// Importiert Icons von `lucide-react`.
import { Check, ChevronRight, Circle } from "lucide-react"

// Importiert die `cn`-Hilfsfunktion zum Zusammenführen von Klassennamen.
import { cn } from "@/lib/utils"

// Definiert die `DropdownMenu`-Komponente als Alias für `DropdownMenuPrimitive.Root`.
const DropdownMenu = DropdownMenuPrimitive.Root

// Definiert die `DropdownMenuTrigger`-Komponente als Alias für `DropdownMenuPrimitive.Trigger`.
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

// Definiert die `DropdownMenuGroup`-Komponente als Alias für `DropdownMenuPrimitive.Group`.
const DropdownMenuGroup = DropdownMenuPrimitive.Group

// Definiert die `DropdownMenuPortal`-Komponente als Alias für `DropdownMenuPrimitive.Portal`.
const DropdownMenuPortal = DropdownMenuPrimitive.Portal

// Definiert die `DropdownMenuSub`-Komponente als Alias für `DropdownMenuPrimitive.Sub`.
const DropdownMenuSub = DropdownMenuPrimitive.Sub

// Definiert die `DropdownMenuRadioGroup`-Komponente als Alias für `DropdownMenuPrimitive.RadioGroup`.
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

// Definiert die `DropdownMenuSubTrigger`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert `DropdownMenuPrimitive.SubTrigger`.
// `className`: Zusätzliche CSS-Klassen.
// `inset`: Boolescher Wert, der bestimmt, ob ein linker Einzug hinzugefügt werden soll.
// `children`: Die Kind-Elemente, die im Trigger gerendert werden sollen.
const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    {/* Zeigt ein Chevron-Rechts-Icon an. */}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))
// Setzt den Anzeigenamen für die `DropdownMenuSubTrigger`-Komponente.
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

// Definiert die `DropdownMenuSubContent`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert `DropdownMenuPrimitive.SubContent`.
// `className`: Zusätzliche CSS-Klassen für den Untermenü-Inhalt.
const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      className
    )}
    {...props}
  />
))
// Setzt den Anzeigenamen für die `DropdownMenuSubContent`-Komponente.
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

// Definiert die `DropdownMenuContent`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert `DropdownMenuPrimitive.Content` innerhalb eines `DropdownMenuPrimitive.Portal`.
// `className`: Zusätzliche CSS-Klassen für den Menü-Inhalt.
// `sideOffset`: Der Abstand zum Trigger-Element (Standard: 4).
const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
// Setzt den Anzeigenamen für die `DropdownMenuContent`-Komponente.
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

// Definiert die `DropdownMenuItem`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert `DropdownMenuPrimitive.Item`.
// `className`: Zusätzliche CSS-Klassen.
// `inset`: Boolescher Wert, der bestimmt, ob ein linker Einzug hinzugefügt werden soll.
const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
// Setzt den Anzeigenamen für die `DropdownMenuItem`-Komponente.
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

// Definiert die `DropdownMenuCheckboxItem`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert `DropdownMenuPrimitive.CheckboxItem`.
// `className`: Zusätzliche CSS-Klassen.
// `children`: Die Kind-Elemente, die im Checkbox-Item gerendert werden sollen.
// `checked`: Der aktuelle Checked-Zustand des Checkbox-Items.
const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    {/* Zeigt ein Häkchen-Icon an, wenn das Element ausgewählt ist. */}
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
// Setzt den Anzeigenamen für die `DropdownMenuCheckboxItem`-Komponente.
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

// Definiert die `DropdownMenuRadioItem`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert `DropdownMenuPrimitive.RadioItem`.
// `className`: Zusätzliche CSS-Klassen.
// `children`: Die Kind-Elemente, die im Radio-Item gerendert werden sollen.
const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    {/* Zeigt einen Kreis an, wenn das Element ausgewählt ist. */}
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
// Setzt den Anzeigenamen für die `DropdownMenuRadioItem`-Komponente.
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

// Definiert die `DropdownMenuLabel`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert `DropdownMenuPrimitive.Label`.
// `className`: Zusätzliche CSS-Klassen.
// `inset`: Boolescher Wert, der bestimmt, ob ein linker Einzug hinzugefügt werden soll.
const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
// Setzt den Anzeigenamen für die `DropdownMenuLabel`-Komponente.
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

// Definiert die `DropdownMenuSeparator`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert `DropdownMenuPrimitive.Separator`.
// `className`: Zusätzliche CSS-Klassen für den Separator.
const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
// Setzt den Anzeigenamen für die `DropdownMenuSeparator`-Komponente.
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

// Definiert die `DropdownMenuShortcut`-Komponente.
// Sie akzeptiert `className` und andere HTML-Attribute.
// `className`: Wendet Stile für Tastenkombinationen an, wie Textgröße, Buchstabenabstand und Farbe.
const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
// Setzt den Anzeigenamen für die `DropdownMenuShortcut`-Komponente.
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
