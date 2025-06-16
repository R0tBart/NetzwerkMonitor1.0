
// Importiert React für die Komponentendefinition.
import * as React from "react"
// Importiert die Basis-Komponenten von Radix UI für AlertDialog.
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

// Importiert die Hilfsfunktion 'cn' für bedingtes Klassennamen-Styling.
import { cn } from "@/lib/utils"
// Importiert die Varianten für Buttons, die in diesem Dialog verwendet werden können.
import { buttonVariants } from "@/components/ui/button"

// Definiert die Haupt-AlertDialog-Komponente, basierend auf AlertDialogPrimitive.Root.
const AlertDialog = AlertDialogPrimitive.Root

// Definiert den Trigger zum Öffnen des AlertDialogs.
const AlertDialogTrigger = AlertDialogPrimitive.Trigger

// Definiert das Portal, in das der AlertDialog gerendert wird. Dies ermöglicht das Rendern außerhalb des DOM-Baums der Elternkomponente.
const AlertDialogPortal = AlertDialogPrimitive.Portal

// Definiert das Overlay, das den Hintergrund abdunkelt, wenn der Dialog geöffnet ist.
const AlertDialogOverlay = React.forwardRef< // Verwendet React.forwardRef, um eine Referenz an das DOM-Element weiterzuleiten.
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>, // Typ des referenzierten Elements.
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay> // Props des AlertDialogPrimitive.Overlay.
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay // Rendert das Radix UI AlertDialog Overlay.
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", // Styling für das Overlay, inklusive Animationen für Ein- und Ausblenden.
      className
    )}
    {...props} // Leitet alle weiteren Props weiter.
    ref={ref} // Leitet die Referenz weiter.
  />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName // Setzt den Anzeigenamen für das AlertDialogOverlay zur besseren Debugging-Erfahrung.

// Definiert den Inhalt des AlertDialogs.
const AlertDialogContent = React.forwardRef< // Verwendet React.forwardRef, um eine Referenz an das DOM-Element weiterzuleiten.
  React.ElementRef<typeof AlertDialogPrimitive.Content>, // Typ des referenzierten Elements.
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> // Props des AlertDialogPrimitive.Content.
>(({ className, ...props }, ref) => (
  <AlertDialogPortal> {/* Rendert den Inhalt im Portal. */}
    <AlertDialogOverlay /> {/* Fügt das Overlay hinzu. */}
    <AlertDialogPrimitive.Content // Rendert den Radix UI AlertDialog Content.
      ref={ref} // Leitet die Referenz weiter.
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", // Styling für den Inhalt, inklusive Animationen und Positionierung in der Mitte des Bildschirms.
        className
      )}
      {...props} // Leitet alle weiteren Props weiter.
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName // Setzt den Anzeigenamen für den AlertDialogContent.

// Definiert den Header-Bereich des AlertDialogs.
const AlertDialogHeader = ({ // Eine funktionale Komponente für den Header.
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left", // Styling für den Header, zentriert auf kleinen Bildschirmen, linksbündig auf größeren.
      className
    )}
    {...props}
  />
)
AlertDialogHeader.displayName = "AlertDialogHeader" // Setzt den Anzeigenamen für den AlertDialogHeader.

// Definiert den Footer-Bereich des AlertDialogs.
const AlertDialogFooter = ({ // Eine funktionale Komponente für den Footer.
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", // Styling für den Footer, Buttons werden auf kleinen Bildschirmen vertikal gestapelt, auf größeren horizontal ausgerichtet.
      className
    )}
    {...props}
  />
)
AlertDialogFooter.displayName = "AlertDialogFooter" // Setzt den Anzeigenamen für den AlertDialogFooter.

// Definiert den Titel des AlertDialogs.
const AlertDialogTitle = React.forwardRef< // Verwendet React.forwardRef, um eine Referenz an das DOM-Element weiterzuleiten.
  React.ElementRef<typeof AlertDialogPrimitive.Title>, // Typ des referenzierten Elements.
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title> // Props des AlertDialogPrimitive.Title.
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title // Rendert den Radix UI AlertDialog Title.
    ref={ref} // Leitet die Referenz weiter.
    className={cn("text-lg font-semibold", className)} // Styling für den Titel, inklusive Schriftgröße und -gewicht.
    {...props} // Leitet alle weiteren Props weiter.
  />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName // Setzt den Anzeigenamen für den AlertDialogTitle.

// Definiert die Beschreibung des AlertDialogs.
const AlertDialogDescription = React.forwardRef< // Verwendet React.forwardRef, um eine Referenz an das DOM-Element weiterzuleiten.
  React.ElementRef<typeof AlertDialogPrimitive.Description>, // Typ des referenzierten Elements.
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description> // Props des AlertDialogPrimitive.Description.
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description // Rendert die Radix UI AlertDialog Description.
    ref={ref} // Leitet die Referenz weiter.
    className={cn("text-sm text-muted-foreground", className)} // Styling für die Beschreibung, inklusive Schriftgröße und Textfarbe.
    {...props} // Leitet alle weiteren Props weiter.
  />
))
AlertDialogDescription.displayName = // Setzt den Anzeigenamen für die AlertDialogDescription.
  AlertDialogPrimitive.Description.displayName

// Definiert den Action-Button des AlertDialogs.
const AlertDialogAction = React.forwardRef< // Verwendet React.forwardRef, um eine Referenz an das DOM-Element weiterzuleiten.
  React.ElementRef<typeof AlertDialogPrimitive.Action>, // Typ des referenzierten Elements.
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> // Props des AlertDialogPrimitive.Action.
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action // Rendert den Radix UI AlertDialog Action Button.
    ref={ref} // Leitet die Referenz weiter.
    className={cn(buttonVariants(), className)} // Wendet Button-Varianten und zusätzliche Klassen an.
    {...props} // Leitet alle weiteren Props weiter.
  />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName // Setzt den Anzeigenamen für den AlertDialogAction.

// Definiert den Cancel-Button des AlertDialogs.
const AlertDialogCancel = React.forwardRef< // Verwendet React.forwardRef, um eine Referenz an das DOM-Element weiterzuleiten.
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>, // Typ des referenzierten Elements.
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> // Props des AlertDialogPrimitive.Cancel.
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel // Rendert den Radix UI AlertDialog Cancel Button.
    ref={ref} // Leitet die Referenz weiter.
    className={cn(
      buttonVariants({ variant: "outline" }), // Wendet die 'outline'-Variante der Buttons an.
      "mt-2 sm:mt-0", // Fügt oberen Margin auf kleinen Bildschirmen hinzu, entfernt ihn auf größeren.
      className
    )}
    {...props} // Leitet alle weiteren Props weiter.
  />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName // Setzt den Anzeigenamen für den AlertDialogCancel.

// Exportiert alle Komponenten für die Verwendung in anderen Teilen der Anwendung.
export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
