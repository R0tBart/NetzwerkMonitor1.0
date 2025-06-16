// Importiert React für die Komponentendefinition.
import * as React from "react"

// Importiert die Toast-Komponenten-Primitive von Radix UI.
import * as ToastPrimitives from "@radix-ui/react-toast"
// Importiert cva (class-variance-authority) für die bedingte Anwendung von Tailwind-Klassen und VariantProps für Typdefinitionen.
import { cva, type VariantProps } from "class-variance-authority"
// Importiert das X-Icon von Lucide React.
import { X } from "lucide-react"

// Importiert eine Utility-Funktion zum Zusammenführen von Klassennamen.
import { cn } from "@/lib/utils"

// Definiert den ToastProvider, der den Kontext für alle Toast-Komponenten bereitstellt.
const ToastProvider = ToastPrimitives.Provider

// Definiert den ToastViewport, den Container, in dem Toasts gerendert werden.
const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>, // Typ des Referenzelements.
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport> // Leitet alle Props des nativen Viewport-Elements weiter.
>(({ className, ...props }, ref) => (
  // Rendert die Viewport-Komponente von Radix UI.
  <ToastPrimitives.Viewport
    ref={ref} // Leitet die Ref an das Viewport-Element weiter.
    // Wendet Standardstile und zusätzliche, über `className` übergebene Stile an.
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props} // Leitet alle weiteren Props an die Viewport-Komponente weiter.
  />
))
// Setzt den Display-Namen für die ToastViewport-Komponente, nützlich für Debugging in React DevTools.
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

// Definiert die Varianten für die Toast-Komponente mit cva.
const toastVariants = cva(
  // Basisstile für den Toast.
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    // Definiert verschiedene Varianten des Toasts.
    variants: {
      variant: {
        // Standard-Toast-Stile.
        default: "border bg-background text-foreground",
        // Destruktive Toast-Stile (z.B. für Fehlermeldungen).
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    // Setzt die Standardvariante.
    defaultVariants: {
      variant: "default",
    },
  }
)

// Definiert die Toast-Komponente selbst.
const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>, // Typ des Referenzelements.
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & // Leitet alle Props des nativen Root-Elements weiter.
    VariantProps<typeof toastVariants> // Fügt die VariantProps hinzu.
>(({ className, variant, ...props }, ref) => {
  return (
    // Rendert die Root-Komponente des Toasts von Radix UI.
    <ToastPrimitives.Root
      ref={ref} // Leitet die Ref an das Root-Element weiter.
      // Wendet die durch `toastVariants` definierten Stile und zusätzliche, über `className` übergebene Stile an.
      className={cn(toastVariants({ variant }), className)}
      {...props} // Leitet alle weiteren Props an die Root-Komponente weiter.
    />
  )
})
// Setzt den Display-Namen für die Toast-Komponente, nützlich für Debugging in React DevTools.
Toast.displayName = ToastPrimitives.Root.displayName

// Definiert die ToastAction-Komponente für Aktionen innerhalb eines Toasts.
const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>, // Typ des Referenzelements.
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action> // Leitet alle Props des nativen Action-Elements weiter.
>(({ className, ...props }, ref) => (
  // Rendert die Action-Komponente von Radix UI.
  <ToastPrimitives.Action
    ref={ref} // Leitet die Ref an das Action-Element weiter.
    // Wendet Standardstile und zusätzliche, über `className` übergebene Stile an.
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props} // Leitet alle weiteren Props an die Action-Komponente weiter.
  />
))
// Setzt den Display-Namen für die ToastAction-Komponente, nützlich für Debugging in React DevTools.
ToastAction.displayName = ToastPrimitives.Action.displayName

// Definiert die ToastClose-Komponente für das Schließen eines Toasts.
const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>, // Typ des Referenzelements.
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close> // Leitet alle Props des nativen Close-Elements weiter.
>(({ className, ...props }, ref) => (
  // Rendert die Close-Komponente von Radix UI.
  <ToastPrimitives.Close
    ref={ref} // Leitet die Ref an das Close-Element weiter.
    // Wendet Standardstile und zusätzliche, über `className` übergebene Stile an.
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close="" // Benutzerdefiniertes Attribut für Styling oder Logik.
    {...props} // Leitet alle weiteren Props an die Close-Komponente weiter.
  >
    {/* Rendert das X-Icon innerhalb des Schließen-Buttons. */}
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
// Setzt den Display-Namen für die ToastClose-Komponente, nützlich für Debugging in React DevTools.
ToastClose.displayName = ToastPrimitives.Close.displayName

// Definiert die ToastTitle-Komponente für den Titel eines Toasts.
const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>, // Typ des Referenzelements.
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title> // Leitet alle Props des nativen Title-Elements weiter.
>(({ className, ...props }, ref) => (
  // Rendert die Title-Komponente von Radix UI.
  <ToastPrimitives.Title
    ref={ref} // Leitet die Ref an das Title-Element weiter.
    className={cn("text-sm font-semibold", className)} // Wendet Standardstile und zusätzliche Stile an.
    {...props} // Leitet alle weiteren Props an die Title-Komponente weiter.
  />
))
// Setzt den Display-Namen für die ToastTitle-Komponente, nützlich für Debugging in React DevTools.
ToastTitle.displayName = ToastPrimitives.Title.displayName

// Definiert die ToastDescription-Komponente für die Beschreibung eines Toasts.
const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>, // Typ des Referenzelements.
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description> // Leitet alle Props des nativen Description-Elements weiter.
>(({ className, ...props }, ref) => (
  // Rendert die Description-Komponente von Radix UI.
  <ToastPrimitives.Description
    ref={ref} // Leitet die Ref an das Description-Element weiter.
    className={cn("text-sm opacity-90", className)} // Wendet Standardstile und zusätzliche Stile an.
    {...props} // Leitet alle weiteren Props an die Description-Komponente weiter.
  />
))
// Setzt den Display-Namen für die ToastDescription-Komponente, nützlich für Debugging in React DevTools.
ToastDescription.displayName = ToastPrimitives.Description.displayName

// Definiert den Typ für die Props der Toast-Komponente.
type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

// Definiert den Typ für ein ToastAction-Element.
type ToastActionElement = React.ReactElement<typeof ToastAction>

// Exportiert alle relevanten Toast-Komponenten und Typen für die Verwendung in anderen Teilen der Anwendung.
export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
