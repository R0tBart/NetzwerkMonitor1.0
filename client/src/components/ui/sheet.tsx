"use client"

// Importiert React für die Komponentendefinition.
import * as React from "react"
// Importiert alle Komponenten von `@radix-ui/react-dialog` als `SheetPrimitive`.
import * as SheetPrimitive from "@radix-ui/react-dialog"
// Importiert `cva` und `VariantProps` für die Variantenverwaltung von Klassennamen.
import { cva, type VariantProps } from "class-variance-authority"
// Importiert das `X`-Icon von `lucide-react`.
import { X } from "lucide-react"

// Importiert die `cn`-Hilfsfunktion zum Zusammenführen von Klassennamen.
import { cn } from "@/lib/utils"

// Definiert die `Sheet`-Komponente als Alias für `SheetPrimitive.Root`.
const Sheet = SheetPrimitive.Root

// Definiert die `SheetTrigger`-Komponente als Alias für `SheetPrimitive.Trigger`.
const SheetTrigger = SheetPrimitive.Trigger

// Definiert die `SheetClose`-Komponente als Alias für `SheetPrimitive.Close`.
const SheetClose = SheetPrimitive.Close

// Definiert die `SheetPortal`-Komponente als Alias für `SheetPrimitive.Portal`.
const SheetPortal = SheetPrimitive.Portal

// Definiert die `SheetOverlay`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert das Overlay für das Sheet.
// `className`: Zusätzliche CSS-Klassen.
const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
// Setzt den Anzeigenamen für die `SheetOverlay`-Komponente.
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

// Definiert die Varianten für das Sheet mit `cva`.
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

// Definiert die Props-Schnittstelle für `SheetContent`.
interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

// Definiert die `SheetContent`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert den Inhalt des Sheets.
// `side`: Die Seite, von der das Sheet hereinkommt (Standard: "right").
// `className`: Zusätzliche CSS-Klassen.
// `children`: Die Kindelemente, die im Inhalt gerendert werden sollen.
const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
// Setzt den Anzeigenamen für die `SheetContent`-Komponente.
SheetContent.displayName = SheetPrimitive.Content.displayName

// Definiert die `SheetHeader`-Komponente.
// Diese Komponente rendert den Header des Sheets.
// `className`: Zusätzliche CSS-Klassen.
const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
// Setzt den Anzeigenamen für die `SheetHeader`-Komponente.
SheetHeader.displayName = "SheetHeader"

// Definiert die `SheetFooter`-Komponente.
// Diese Komponente rendert den Footer des Sheets.
// `className`: Zusätzliche CSS-Klassen.
const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
// Setzt den Anzeigenamen für die `SheetFooter`-Komponente.
SheetFooter.displayName = "SheetFooter"

// Definiert die `SheetTitle`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert den Titel des Sheets.
// `className`: Zusätzliche CSS-Klassen.
const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
// Setzt den Anzeigenamen für die `SheetTitle`-Komponente.
SheetTitle.displayName = SheetPrimitive.Title.displayName

// Definiert die `SheetDescription`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert die Beschreibung des Sheets.
// `className`: Zusätzliche CSS-Klassen.
const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
// Setzt den Anzeigenamen für die `SheetDescription`-Komponente.
SheetDescription.displayName = SheetPrimitive.Description.displayName

// Exportiert die `Sheet`, `SheetPortal`, `SheetOverlay`, `SheetTrigger`, `SheetClose`,
// `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle` und `SheetDescription` Komponenten.
export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
