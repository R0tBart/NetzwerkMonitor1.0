// Importiert React für die Komponentendefinition.
import * as React from "react"
// Importiert alle Komponenten von `@radix-ui/react-navigation-menu` als `NavigationMenuPrimitive`.
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
// Importiert `cva` von `class-variance-authority` für die Variantenverwaltung von CSS-Klassen.
import { cva } from "class-variance-authority"
// Importiert das `ChevronDown`-Icon von `lucide-react`.
import { ChevronDown } from "lucide-react"

// Importiert die `cn`-Hilfsfunktion zum Zusammenführen von Klassennamen.
import { cn } from "@/lib/utils"

// Definiert die `NavigationMenu`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert das Haupt-Navigationsmenü.
// `className`: Zusätzliche CSS-Klassen.
// `children`: Die Kind-Elemente, die gerendert werden sollen.
const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
// Setzt den Anzeigenamen für die `NavigationMenu`-Komponente.
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

// Definiert die `NavigationMenuList`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert eine Liste von Navigationselementen.
// `className`: Zusätzliche CSS-Klassen.
const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  />
))
// Setzt den Anzeigenamen für die `NavigationMenuList`-Komponente.
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

// Definiert die `NavigationMenuItem`-Komponente als Alias für `NavigationMenuPrimitive.Item`.
const NavigationMenuItem = NavigationMenuPrimitive.Item

// Definiert die Stilvarianten für den Navigation Menu Trigger mit `cva`.
const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent"
)

// Definiert die `NavigationMenuTrigger`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert den Trigger für ein Navigationselement.
// `className`: Zusätzliche CSS-Klassen.
// `children`: Die Kind-Elemente, die gerendert werden sollen.
const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
))
// Setzt den Anzeigenamen für die `NavigationMenuTrigger`-Komponente.
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

// Definiert die `NavigationMenuContent`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert den Inhalt eines Navigationselements.
// `className`: Zusätzliche CSS-Klassen.
const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
      className
    )}
    {...props}
  />
))
// Setzt den Anzeigenamen für die `NavigationMenuContent`-Komponente.
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

// Definiert die `NavigationMenuLink`-Komponente als Alias für `NavigationMenuPrimitive.Link`.
const NavigationMenuLink = NavigationMenuPrimitive.Link

// Definiert die `NavigationMenuViewport`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert den Viewport für das Navigationsmenü.
// `className`: Zusätzliche CSS-Klassen.
const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
))
// Setzt den Anzeigenamen für die `NavigationMenuViewport`-Komponente.
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName

// Definiert die `NavigationMenuIndicator`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert den Indikator für das aktive Navigationselement.
// `className`: Zusätzliche CSS-Klassen.
const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
))
// Setzt den Anzeigenamen für die `NavigationMenuIndicator`-Komponente.
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName

// Exportiert alle Navigation Menu-bezogenen Komponenten und Stile zur Verwendung in anderen Teilen der Anwendung.
export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}
