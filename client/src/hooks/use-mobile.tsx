import * as React from "react"

// Definiert den Breakpoint für mobile Geräte. Bildschirme, die kleiner als dieser Wert sind, werden als mobil betrachtet.
const MOBILE_BREAKPOINT = 768

/**
 * `useIsMobile` ist ein benutzerdefinierter React-Hook, der den mobilen Status des Viewports verfolgt.
 * Er gibt `true` zurück, wenn die Bildschirmbreite kleiner als `MOBILE_BREAKPOINT` ist, andernfalls `false`.
 */
export function useIsMobile() {
  // Verwaltet den mobilen Status. `undefined` wird als Anfangswert verwendet, bis der Hook gemountet ist.
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Erstellt eine Media Query Liste, um Änderungen der Bildschirmbreite zu überwachen.
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    // Definiert die Callback-Funktion, die aufgerufen wird, wenn sich die Bildschirmgröße ändert.
    const onChange = () => {
      // Aktualisiert den mobilen Status basierend auf der aktuellen Fensterbreite.
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Fügt einen Event Listener hinzu, um auf Änderungen der Media Query zu reagieren.
    mql.addEventListener("change", onChange)

    // Setzt den anfänglichen mobilen Status, wenn die Komponente gemountet wird.
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    // Bereinigt den Event Listener, wenn die Komponente unmounted wird.
    return () => mql.removeEventListener("change", onChange)
  }, []) // Das leere Array stellt sicher, dass der Effekt nur einmal beim Mounten ausgeführt wird.

  // Gibt den mobilen Status als booleschen Wert zurück. `!!` konvertiert `undefined` zu `false`.
  return !!isMobile
}
