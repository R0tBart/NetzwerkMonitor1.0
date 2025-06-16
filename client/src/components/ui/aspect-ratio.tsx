// Importiert alle Exporte von `@radix-ui/react-aspect-ratio` als `AspectRatioPrimitive`.
// Importiert alle Exporte von `@radix-ui/react-aspect-ratio` als `AspectRatioPrimitive`.
// Dies ermöglicht die Nutzung der von Radix UI bereitgestellten AspectRatio-Komponenten.
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

// Definiert die `AspectRatio`-Komponente als Alias für `AspectRatioPrimitive.Root`.
// Dies ist eine einfache Wrapper-Komponente, die das Seitenverhältnis ihres Inhalts beibehält und sicherstellt,
// dass der Inhalt immer in einem bestimmten Seitenverhältnis angezeigt wird, unabhängig von der verfügbaren Breite.
const AspectRatio = AspectRatioPrimitive.Root

// Exportiert die `AspectRatio`-Komponente zur Verwendung in anderen Teilen der Anwendung.
// Dies macht die Komponente für andere Module importierbar.
export { AspectRatio }
