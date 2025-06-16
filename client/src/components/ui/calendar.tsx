// Importiert React für die Komponentendefinition und Typen.
import * as React from "react"
// Importiert `ChevronLeft` und `ChevronRight` Icons von `lucide-react` für die Navigation im Kalender.
import { ChevronLeft, ChevronRight } from "lucide-react"
// Importiert `DayPicker` von `react-day-picker` für die grundlegende Kalenderfunktionalität.
import { DayPicker } from "react-day-picker"

// Importiert die `cn`-Hilfsfunktion zum Konditionalen Zusammenführen von Klassennamen, nützlich für Tailwind CSS.
import { cn } from "@/lib/utils"
// Importiert `buttonVariants` aus der lokalen Button-Komponente, um eine konsistente Styling-Basis für die Navigationsbuttons zu gewährleisten.
import { buttonVariants } from "@/components/ui/button"

// Definiert den Typ `CalendarProps` als eine Erweiterung der React-Komponenten-Props von `DayPicker`.
// Dies ermöglicht die Übergabe aller Standard-Props des `DayPicker` sowie benutzerdefinierter Props.
export type CalendarProps = React.ComponentProps<typeof DayPicker>

// Definiert die `Calendar`-Komponente, die einen interaktiven Kalender darstellt.
// `className`: Zusätzliche CSS-Klassen, die auf den Hauptcontainer des Kalenders angewendet werden.
// `classNames`: Ein Objekt, das es ermöglicht, spezifische CSS-Klassen für verschiedene interne Elemente des `DayPicker` zu überschreiben.
// `showOutsideDays`: Ein optionales Boolean-Flag, das steuert, ob Tage außerhalb des aktuell angezeigten Monats sichtbar sind (Standard: `true`).
// `...props`: Alle weiteren Props werden direkt an die zugrunde liegende `DayPicker`-Komponente weitergeleitet.
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        // Stile für die Monatsansicht (nebeneinander auf größeren Bildschirmen).
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        // Stile für einen einzelnen Monat.
        month: "space-y-4",
        // Stile für die Überschrift des Kalenders (Monat und Jahr).
        caption: "flex justify-center pt-1 relative items-center",
        // Stile für das Label der Überschrift.
        caption_label: "text-sm font-medium",
        // Stile für die Navigationsbuttons.
        nav: "space-x-1 flex items-center",
        // Stile für die Navigationsbuttons (Pfeile).
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        // Position des "Zurück"-Buttons.
        nav_button_previous: "absolute left-1",
        // Position des "Weiter"-Buttons.
        nav_button_next: "absolute right-1",
        // Stile für die Tabelle der Tage.
        table: "w-full border-collapse space-y-1",
        // Stile für die Kopfzeile der Wochentage.
        head_row: "flex",
        // Stile für die Zellen der Wochentage.
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        // Stile für eine Zeile von Tagen.
        row: "flex w-full mt-2",
        // Stile für eine einzelne Tageszelle.
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        // Stile für einen einzelnen Tag.
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        // Stile für das Ende eines ausgewählten Datumsbereichs.
        day_range_end: "day-range-end",
        // Stile für den ausgewählten Tag.
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        // Stile für den heutigen Tag.
        day_today: "bg-accent text-accent-foreground",
        // Stile für Tage außerhalb des aktuellen Monats.
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        // Stile für deaktivierte Tage.
        day_disabled: "text-muted-foreground opacity-50",
        // Stile für Tage in der Mitte eines ausgewählten Datumsbereichs.
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        // Stile für ausgeblendete Tage.
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        // Benutzerdefinierte Komponente für das linke Chevron-Icon.
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
        ),
        // Benutzerdefinierte Komponente für das rechte Chevron-Icon.
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  )
}
// Setzt den Anzeigenamen für die `Calendar`-Komponente zur besseren Debugging-Erfahrung in den React DevTools.
Calendar.displayName = "Calendar"

// Exportiert die `Calendar`-Komponente zur Verwendung in anderen Teilen der Anwendung.
export { Calendar }
