"use client"

import * as React from "react" // Importiert React

type Theme = "dark" | "light" // Definiert den Typ für das Theme

interface ThemeProviderProps { // Definiert die Props für den ThemeProvider
  children: React.ReactNode // Die Kind-Elemente, die das Theme erhalten sollen
  defaultTheme?: Theme // Optionales Standard-Theme
  storageKey?: string // Optionaler Schlüssel für den Local Storage
}

export function ThemeProvider({ // ThemeProvider Komponente
  children,
  defaultTheme = "dark", // Standard-Theme ist 'dark'
  storageKey = "vite-ui-theme", // Standard-Speicherschlüssel
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>( // State für das aktuelle Theme
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme // Holt Theme aus Local Storage oder nutzt Standard
  )

  React.useEffect(() => { // Effekt-Hook für Theme-Änderungen
    const root = window.document.documentElement // Holt das HTML-Wurzelelement
    root.classList.remove("light", "dark") // Entfernt bestehende Theme-Klassen
    root.classList.add(theme) // Fügt die aktuelle Theme-Klasse hinzu
    localStorage.setItem(storageKey, theme) // Speichert das Theme im Local Storage
  }, [theme, storageKey]) // Abhängigkeiten: Theme und Speicherschlüssel

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}> {/* Stellt Theme und Setter über Context bereit */}
      {children}
    </ThemeContext.Provider>
  )
}

const ThemeContext = React.createContext<{ // Erstellt den Theme-Context
  theme: Theme
  setTheme: (theme: Theme) => void
}> ({
  theme: "dark", // Standardwert für Theme im Context
  setTheme: () => null, // Standardfunktion für setTheme im Context
})