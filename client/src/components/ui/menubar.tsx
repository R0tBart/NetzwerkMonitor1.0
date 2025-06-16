"use client"

// Importiert React für die Komponentendefinition.
import * as React from "react"
// Importiert alle Komponenten von `@radix-ui/react-menubar` als `MenubarPrimitive`.
import * as MenubarPrimitive from "@radix-ui/react-menubar"
// Importiert Icons von `lucide-react`.
import { Check, ChevronRight, Circle } from "lucide-react"

// Importiert die `cn`-Hilfsfunktion zum Zusammenführen von Klassennamen.
import { cn } from "@/lib/utils"

// Definiert die `MenubarMenu`-Komponente.
// Diese Komponente ist ein Wrapper für ein Menü.
function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu {...props} />
}

// Definiert die `MenubarGroup`-Komponente.
// Diese Komponente gruppiert Menüelemente.
function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group {...props} />
}

// Definiert die `MenubarPortal`-Komponente.
 // Diese Komponente rendert den Inhalt des Menüs außerhalb des DOM-Baums.
const MenubarPortal = ({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Portal>) => (
  <MenubarPrimitive.Portal {...props} />
);
MenubarPortal.displayName = MenubarPrimitive.Portal.displayName;

// Definiert die `MenubarRadioGroup`-Komponente.
// Diese Komponente gruppiert Radio-Menüelemente.
function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return <MenubarPrimitive.RadioGroup {...props} />
}

// Definiert die `MenubarSub`-Komponente.
// Diese Komponente ist ein Container für ein Untermenü.
const MenubarSub = ({ ...props }: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Sub>) => (
  <MenubarPrimitive.Sub {...props} />
);
MenubarSub.displayName = MenubarPrimitive.Sub.displayName;

// Definiert die `Menubar`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert die Menüleiste.
// `className`: Zusätzliche CSS-Klassen.
const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-10 items-center space-x-1 rounded-md border bg-background p-1",
      className
    )}
    {...props}
  />
))
// Setzt den Anzeigenamen für die `Menubar`-Komponente.
Menubar.displayName = MenubarPrimitive.Root.displayName

// Definiert die `MenubarTrigger`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert den Trigger für ein Menü.
// `className`: Zusätzliche CSS-Klassen.
const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className
    )}
    {...props}
  />
))
// Setzt den Anzeigenamen für die `MenubarTrigger`-Komponente.
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

// Definiert die `MenubarSubTrigger`-Komponente.
// Diese Komponente ist der Auslöser für ein Untermenü.
const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className
    )}
    {...props}
  />
));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

// Definiert die `MenubarSubContent`-Komponente.
// Diese Komponente ist der Inhalt eines Untermenüs.
const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

// Definiert die `MenubarContent`-Komponente.
// Diese Komponente ist der Inhalt eines Menüs.
const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => (
  <MenubarPrimitive.Portal>
    <MenubarPrimitive.Content
      ref={ref}
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </MenubarPrimitive.Portal>
));
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

// Definiert die `MenubarItem`-Komponente.
// Diese Komponente ist ein einzelnes Element in einem Menü.
const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

// Definiert die `MenubarCheckboxItem`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert ein Menüelement mit einer Checkbox.
// `className`: Zusätzliche CSS-Klassen.
// `children`: Die Kind-Elemente, die gerendert werden sollen.
// Definiert die `MenubarCheckboxItem`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert ein Menüelement mit einer Checkbox.
// `className`: Zusätzliche CSS-Klassen.
// `children`: Die Kind-Elemente, die gerendert werden sollen.
// `checked`: Der Status der Checkbox (ausgewählt oder nicht).
const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      {/* Zeigt das Häkchen an, wenn das Element ausgewählt ist. */}
      <MenubarPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
));
// Setzt den Anzeigenamen für die `MenubarCheckboxItem`-Komponente.
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

// Definiert die `MenubarRadioItem`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert ein Menüelement mit Radio-Button.
// `className`: Zusätzliche CSS-Klassen.
// `children`: Die Kind-Elemente, die gerendert werden sollen.
const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
));
// Setzt den Anzeigenamen für die `MenubarRadioItem`-Komponente.
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;








 // Definiert die `MenubarLabel`-Komponente.
 // Diese Komponente ist ein Label für Menüelemente.
const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;
// Setzt den Anzeigenamen für die `MenubarLabel`-Komponente.
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

// Definiert die `MenubarSeparator`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert einen Separator im Menü.
// `className`: Zusätzliche CSS-Klassen.
// Definiert die `MenubarSeparator`-Komponente.
// Diese Komponente ist ein Separator im Menü.
const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn(
      "-mx-1 my-1 h-px bg-muted",
      className
    )}
    {...props}
  />
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

// Definiert die `MenubarShortcut`-Komponente.
// Diese Komponente rendert einen Shortcut-Text neben einem Menüelement.
// `className`: Zusätzliche CSS-Klassen.
const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
// Remove displayName assignment since it's already defined at the end of the component
      {...props}
    />
  )
}
// Setzt den Anzeigenamen für die `MenubarShortcut`-Komponente.
MenubarShortcut.displayName = "MenubarShortcut"

// Exportiert alle Menubar-bezogenen Komponenten zur Verwendung in anderen Teilen der Anwendung.
export {
  MenubarShortcut,
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
}

