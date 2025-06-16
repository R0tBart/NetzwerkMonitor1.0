"use client"

// Importiert React für die Komponentendefinition.
import * as React from "react"
// Importiert die Drawer-Komponente von 'vaul' und benennt sie als DrawerPrimitive um.
import { Drawer as DrawerPrimitive } from "vaul"

// Importiert die `cn`-Hilfsfunktion zum Zusammenführen von Klassennamen.
import { cn } from "@/lib/utils"

// Definiert die `Drawer`-Komponente.
// `shouldScaleBackground`: Bestimmt, ob der Hintergrund skaliert werden soll (Standard: true).
// `props`: Alle weiteren Props, die an `DrawerPrimitive.Root` übergeben werden.
const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
)
// Setzt den Anzeigenamen für die `Drawer`-Komponente.
Drawer.displayName = "Drawer"

// Definiert die `DrawerTrigger`-Komponente als Alias für `DrawerPrimitive.Trigger`.
const DrawerTrigger = DrawerPrimitive.Trigger

// Definiert die `DrawerPortal`-Komponente als Alias für `DrawerPrimitive.Portal`.
const DrawerPortal = DrawerPrimitive.Portal

// Definiert die `DrawerClose`-Komponente als Alias für `DrawerPrimitive.Close`.
const DrawerClose = DrawerPrimitive.Close

// Definiert die `DrawerOverlay`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert `DrawerPrimitive.Overlay`.
// `className`: Zusätzliche CSS-Klassen für das Overlay.
const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
))
// Setzt den Anzeigenamen für die `DrawerOverlay`-Komponente.
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

// Definiert die `DrawerContent`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert `DrawerPrimitive.Content` innerhalb eines `DrawerPortal`.
// `className`: Zusätzliche CSS-Klassen für den Drawer-Inhalt.
// `children`: Die Kind-Elemente, die im Drawer-Inhalt gerendert werden sollen.
const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className
      )}
      {...props}
    >
      {/* Handle-Element für den Drawer. */}
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
))
// Setzt den Anzeigenamen für die `DrawerContent`-Komponente.
DrawerContent.displayName = "DrawerContent"

// Definiert die `DrawerHeader`-Komponente.
// Diese Komponente rendert ein `div`-Element für den Drawer-Header.
// `className`: Zusätzliche CSS-Klassen für den Header.
const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
)
// Setzt den Anzeigenamen für die `DrawerHeader`-Komponente.
DrawerHeader.displayName = "DrawerHeader"

// Definiert die `DrawerFooter`-Komponente.
// Diese Komponente rendert ein `div`-Element für den Drawer-Footer.
// `className`: Zusätzliche CSS-Klassen für den Footer.
const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
)
// Setzt den Anzeigenamen für die `DrawerFooter`-Komponente.
DrawerFooter.displayName = "DrawerFooter"

// Definiert die `DrawerTitle`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert `DrawerPrimitive.Title`.
// `className`: Zusätzliche CSS-Klassen für den Titel.
const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
// Setzt den Anzeigenamen für die `DrawerTitle`-Komponente.
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

// Definiert die `DrawerDescription`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert `DrawerPrimitive.Description`.
// `className`: Zusätzliche CSS-Klassen für die Beschreibung.
const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
// Setzt den Anzeigenamen für die `DrawerDescription`-Komponente.
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
