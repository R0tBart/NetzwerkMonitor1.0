// Importiert React für die Komponentendefinition.
import * as React from "react"

// Importiert Typdefinitionen für ToastActionElement und ToastProps aus der UI-Komponente.
import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

// Definiert die maximale Anzahl der gleichzeitig angezeigten Toasts.
const TOAST_LIMIT = 1
// Definiert die Verzögerung, nach der ein Toast entfernt wird. Ein hoher Wert ermöglicht manuelles Schließen.
const TOAST_REMOVE_DELAY = 1000000

// Typdefinition für einen ToasterToast, der die Basis-ToastProps erweitert.
type ToasterToast = ToastProps & {
  id: string // Eindeutige ID des Toasts.
  title?: React.ReactNode // Optionaler Titel des Toasts.
  description?: React.ReactNode // Optionale Beschreibung des Toasts.
  action?: ToastActionElement // Optionale Aktion (Button) im Toast.
}

// Definiert die verschiedenen Aktionstypen für den Reducer.
const actionTypes = {
  ADD_TOAST: "ADD_TOAST", // Aktion zum Hinzufügen eines Toasts.
  UPDATE_TOAST: "UPDATE_TOAST", // Aktion zum Aktualisieren eines Toasts.
  DISMISS_TOAST: "DISMISS_TOAST", // Aktion zum Ausblenden eines Toasts.
  REMOVE_TOAST: "REMOVE_TOAST", // Aktion zum Entfernen eines Toasts.
} as const

// Zähler für die Generierung eindeutiger IDs.
let count = 0

// Funktion zur Generierung einer eindeutigen ID für jeden Toast.
// Die ID wird inkrementiert und stellt sicher, dass jeder Toast eine einzigartige Kennung hat.
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

// Typdefinition für die Aktionstypen.
type ActionType = typeof actionTypes

// Typdefinition für die möglichen Aktionen, die der Reducer verarbeiten kann.
type Action =
  | { // Aktion zum Hinzufügen eines Toasts.
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | { // Aktion zum Aktualisieren eines Toasts.
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | { // Aktion zum Ausblenden eines Toasts.
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | { // Aktion zum Entfernen eines Toasts.
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

// Interface für den Zustand des Toast-Systems.
interface State {
  toasts: ToasterToast[] // Array der aktuell angezeigten Toasts.
}

// Eine Map, um Timeouts für das automatische Entfernen von Toasts zu speichern.
// Dies verhindert, dass Toasts zu früh entfernt werden, wenn sie aktualisiert oder manuell geschlossen werden.
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

// Fügt einen Toast zur Entfernungs-Warteschlange hinzu.
const addToRemoveQueue = (toastId: string) => {
  // Wenn bereits ein Timeout für diesen Toast existiert, wird nichts getan.
  if (toastTimeouts.has(toastId)) {
    return
  }

  // Setzt einen Timeout, um den Toast nach einer Verzögerung zu entfernen.
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId) // Entfernt den Timeout aus der Map.
    dispatch({ // Sendet eine REMOVE_TOAST-Aktion.
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout) // Speichert den Timeout in der Map.
}

// Der Reducer, der den Zustand des Toast-Systems basierend auf Aktionen aktualisiert.
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        // Fügt den neuen Toast am Anfang des Arrays hinzu und begrenzt die Anzahl der Toasts.
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        // Aktualisiert einen bestehenden Toast anhand seiner ID.
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Nebenwirkungen ! - Dies könnte in eine dismissToast()-Aktion ausgelagert werden,
      // aber der Einfachheit halber bleibt es hier.
      if (toastId) {
        addToRemoveQueue(toastId) // Fügt den spezifischen Toast zur Entfernungs-Warteschlange hinzu.
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id) // Fügt alle Toasts zur Entfernungs-Warteschlange hinzu.
        })
      }

      return {
        ...state,
        // Setzt den `open`-Status des Toasts auf `false`, um ihn auszublenden.
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                // Setzt den `open`-Status des Toasts auf `false`, um ihn visuell auszublenden.
                // Der Toast wird später durch die `REMOVE_TOAST`-Aktion vollständig entfernt.
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      // Entfernt alle Toasts, wenn keine spezifische ID angegeben ist.
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        // Entfernt einen spezifischen Toast anhand seiner ID.
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

// Array von Listenern, die bei Zustandsänderungen benachrichtigt werden.
const listeners: Array<(state: State) => void> = []

// Der aktuelle Zustand des Toast-Systems im Speicher.
let memoryState: State = { toasts: [] }

// Dispatch-Funktion, die Aktionen an den Reducer sendet und Listener benachrichtigt.
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action) // Aktualisiert den Zustand.
  listeners.forEach((listener) => {
    listener(memoryState) // Benachrichtigt alle Listener.
  })
}

// Typdefinition für einen Toast ohne die ID (wird intern generiert).
type Toast = Omit<ToasterToast, "id">

// Funktion zum Erstellen und Anzeigen eines Toasts.
function toast({ ...props }: Toast) {
  const id = genId() // Generiert eine neue ID für den Toast.

  // Funktion zum Aktualisieren eines Toasts.
  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  // Funktion zum Ausblenden eines Toasts.
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  // Sendet die ADD_TOAST-Aktion, um den Toast hinzuzufügen.
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true, // Setzt den Toast auf geöffnet.
      onOpenChange: (open) => {
        if (!open) dismiss() // Schließt den Toast, wenn sich der Öffnungsstatus ändert (z.B. durch Klick außerhalb).
      },
    },
  })

  return {
    id: id,
    dismiss, // Funktion zum manuellen Ausblenden des Toasts.
    update, // Funktion zum Aktualisieren des Toasts nach seiner Erstellung.
  }
}

// Hook zur Verwendung des Toast-Systems in React-Komponenten.
function useToast() {
  // Verwaltet den lokalen Zustand der Toasts.
  const [state, setState] = React.useState<State>(memoryState)

  // Fügt den setState-Callback zu den Listenern hinzu und entfernt ihn beim Unmount.
  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, []) // Das leere Abhängigkeitsarray stellt sicher, dass der Effekt nur einmal beim Mounten ausgeführt wird.

  return {
    ...state,
    toast, // Die Funktion zum Erstellen von Toasts.
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }), // Funktion zum Ausblenden von Toasts.
  }
}

// Exportiert den useToast-Hook und die toast-Funktion für die globale Verwendung.
export { useToast, toast }
