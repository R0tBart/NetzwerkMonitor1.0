"use client"

// Importiert React für die Komponentendefinition.
import * as React from "react"
// Importiert alle Komponenten von `@radix-ui/react-select` als `SelectPrimitive`.
import * as SelectPrimitive from "@radix-ui/react-select"
// Importiert die Icons `Check`, `ChevronDown` und `ChevronUp` von `lucide-react`.
import { Check, ChevronDown, ChevronUp } from "lucide-react"

// Importiert die `cn`-Hilfsfunktion zum Zusammenführen von Klassennamen.
import { cn } from "@/lib/utils"

// Definiert die `Select`-Komponente als Alias für `SelectPrimitive.Root`.
const Select = SelectPrimitive.Root

// Definiert die `SelectGroup`-Komponente als Alias für `SelectPrimitive.Group`.
const SelectGroup = SelectPrimitive.Group

// Definiert die `SelectValue`-Komponente als Alias für `SelectPrimitive.Value`.
const SelectValue = SelectPrimitive.Value

// Definiert die `SelectTrigger`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert den Trigger für das Select-Feld.
// `className`: Zusätzliche CSS-Klassen.
// `children`: Die Kindelemente, die im Trigger gerendert werden sollen.
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
// Setzt den Anzeigenamen für die `SelectTrigger`-Komponente.
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

// Definiert die `SelectScrollUpButton`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert einen Scroll-Up-Button für das Select-Menü.
// `className`: Zusätzliche CSS-Klassen.
const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
// Setzt den Anzeigenamen für die `SelectScrollUpButton`-Komponente.
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

// Definiert die `SelectScrollDownButton`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert einen Scroll-Down-Button für das Select-Menü.
// `className`: Zusätzliche CSS-Klassen.
const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
// Setzt den Anzeigenamen für die `SelectScrollDownButton`-Komponente.
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

// Definiert die `SelectContent`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert den Inhalt des Select-Menüs.
// `className`: Zusätzliche CSS-Klassen.
// `children`: Die Kindelemente, die im Inhalt gerendert werden sollen.
// `position`: Die Position des Inhalts (Standard: "popper").
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
// Setzt den Anzeigenamen für die `SelectContent`-Komponente.
SelectContent.displayName = SelectPrimitive.Content.displayName

// Definiert die `SelectLabel`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert ein Label für ein Select-Element.
// `className`: Zusätzliche CSS-Klassen.
const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
// Setzt den Anzeigenamen für die `SelectLabel`-Komponente.
SelectLabel.displayName = SelectPrimitive.Label.displayName

// Definiert die `SelectItem`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert ein einzelnes Element im Select-Menü.
// `className`: Zusätzliche CSS-Klassen.
// `children`: Die Kindelemente, die im Element gerendert werden sollen.
const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
// Setzt den Anzeigenamen für die `SelectItem`-Komponente.
SelectItem.displayName = SelectPrimitive.Item.displayName

// Definiert die `SelectSeparator`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert einen Separator im Select-Menü.
// `className`: Zusätzliche CSS-Klassen.
const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
// Setzt den Anzeigenamen für die `SelectSeparator`-Komponente.
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

// Exportiert die `Select`, `SelectGroup`, `SelectValue`, `SelectTrigger`, `SelectContent`,
// `SelectLabel`, `SelectItem`, `SelectSeparator`, `SelectScrollUpButton` und `SelectScrollDownButton` Komponenten.
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
