import { useToast } from "@/hooks/use-toast"
// Importiert die notwendigen Komponenten aus der lokalen Toast-UI-Bibliothek.
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

// Definiert die Toaster-Komponente, die für die Anzeige aller aktiven Toasts zuständig ist.
export function Toaster() {
  // Verwendet den useToast-Hook, um die Liste der aktuellen Toasts abzurufen.
  const { toasts } = useToast()

  return (
    // Der ToastProvider umschließt alle Toast-Komponenten und stellt den Kontext bereit.
    <ToastProvider>
      {/* Iteriert über alle aktiven Toasts und rendert sie. */}
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          // Jede Toast-Nachricht wird als Toast-Komponente gerendert.
          <Toast key={id} {...props}> {/* `key` ist wichtig für die Listen-Rendering in React. */}
            <div className="grid gap-1"> {/* Container für Titel und Beschreibung. */}
              {/* Zeigt den Toast-Titel an, falls vorhanden. */}
              {title && <ToastTitle>{title}</ToastTitle>}
              {/* Zeigt die Toast-Beschreibung an, falls vorhanden. */}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {/* Rendert die Aktion des Toasts, falls vorhanden. */}
            {action}
            {/* Rendert den Schließen-Button für den Toast. */}
            <ToastClose />
          </Toast>
        )
      })}
      {/* Der ToastViewport ist der Bereich, in dem die Toasts angezeigt werden. */}
      <ToastViewport />
    </ToastProvider>
  )
}
