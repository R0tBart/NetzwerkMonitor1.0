// Importiert React für die Komponentendefinition und Hooks.
import * as React from "react"
// Importiert den `useEmblaCarousel`-Hook und zugehörige Typen für die Karussell-Funktionalität.
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
// Importiert die Icons `ArrowLeft` und `ArrowRight` von `lucide-react` für die Karussell-Navigation.
import { ArrowLeft, ArrowRight } from "lucide-react"

// Importiert die `cn`-Hilfsfunktion zum Konditionalen Zusammenführen von Klassennamen.
import { cn } from "@/lib/utils"
// Importiert die `Button`-Komponente für die Navigationsbuttons des Karussells.
import { Button } from "@/components/ui/button"

// Definiert den Typ für die Embla Carousel API.
type CarouselApi = UseEmblaCarouselType[1]
// Definiert den Typ für die Parameter des `useEmblaCarousel`-Hooks.
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
// Definiert den Typ für die Optionen des Embla Carousel.
type CarouselOptions = UseCarouselParameters[0]
// Definiert den Typ für die Plugins des Embla Carousel.
type CarouselPlugin = UseCarouselParameters[1]

// Definiert die Props für die `Carousel`-Komponente.
type CarouselProps = {
  opts?: CarouselOptions // Optionen für Embla Carousel.
  plugins?: CarouselPlugin // Plugins für Embla Carousel.
  orientation?: "horizontal" | "vertical" // Ausrichtung des Karussells (horizontal oder vertikal).
  setApi?: (api: CarouselApi) => void // Callback zum Setzen der Embla Carousel API.
}

// Definiert die Props für den `CarouselContext`.
type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0] // Referenz zum Karussell-Container.
  api: ReturnType<typeof useEmblaCarousel>[1] // Die Embla Carousel API.
  scrollPrev: () => void // Funktion zum Scrollen zum vorherigen Element.
  scrollNext: () => void // Funktion zum Scrollen zum nächsten Element.
  canScrollPrev: boolean // Zeigt an, ob zum vorherigen Element gescrollt werden kann.
  canScrollNext: boolean // Zeigt an, ob zum nächsten Element gescrollt werden kann.
} & CarouselProps

// Erstellt einen React Context für das Karussell, um die API und Zustände an untergeordnete Komponenten weiterzugeben.
const CarouselContext = React.createContext<CarouselContextProps | null>(null)

// `useCarousel` ist ein Hook, der den `CarouselContext` konsumiert.
// Er stellt sicher, dass der Hook nur innerhalb einer `Carousel`-Komponente verwendet wird.
function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

// Definiert die `Carousel`-Komponente, die den Hauptcontainer für das Karussell darstellt.
// Sie akzeptiert `orientation`, `opts`, `setApi`, `plugins`, `className` und `children`.
// `ref`: Eine Referenz, die an das zugrunde liegende `div`-Element weitergeleitet wird.
const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

// Definiert die `CarouselContent`-Komponente, die den Inhalt des Karussells umschließt.
// `className`: Zusätzliche CSS-Klassen für den Inhaltsbereich.
// `ref`: Eine Referenz, die an das zugrunde liegende `div`-Element weitergeleitet wird.
const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden"> {/* Der Embla-Container */} 
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", // Setzt den negativen Margin basierend auf der Ausrichtung.
          className
        )}
        {...props}
      />
    </div>
  )
})
// Setzt den Anzeigenamen für die `CarouselContent`-Komponente.
CarouselContent.displayName = "CarouselContent"

// Definiert die `CarouselItem`-Komponente, die ein einzelnes Element im Karussell darstellt.
// `className`: Zusätzliche CSS-Klassen für das Karussell-Element.
// `ref`: Eine Referenz, die an das zugrunde liegende `div`-Element weitergeleitet wird.
const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group" // Semantische Rolle für Barrierefreiheit.
      aria-roledescription="slide" // Beschreibung der Rolle für Barrierefreiheit.
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full", // Stellt sicher, dass jedes Element die volle Breite/Höhe einnimmt.
        orientation === "horizontal" ? "pl-4" : "pt-4", // Setzt Padding basierend auf der Ausrichtung.
        className
      )}
      {...props}
    />
  )
})
// Setzt den Anzeigenamen für die `CarouselItem`-Komponente.
CarouselItem.displayName = "CarouselItem"

// Definiert die `CarouselPrevious`-Komponente, einen Button zum Scrollen zum vorherigen Karussell-Element.
// `className`: Zusätzliche CSS-Klassen für den Button.
// `variant`, `size`: Props, die an die `Button`-Komponente weitergeleitet werden.
// `ref`: Eine Referenz, die an das zugrunde liegende `button`-Element weitergeleitet wird.
const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2" // Positionierung für horizontale Karussells.
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90", // Positionierung für vertikale Karussells mit Rotation.
        className
      )}
      onClick={scrollPrev}
      disabled={!canScrollPrev} // Deaktiviert den Button, wenn nicht mehr gescrollt werden kann.
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span> {/* Für Barrierefreiheit */} 
    </Button>
  )
})
// Setzt den Anzeigenamen für die `CarouselPrevious`-Komponente.
CarouselPrevious.displayName = "CarouselPrevious"

// Definiert die `CarouselNext`-Komponente, einen Button zum Scrollen zum nächsten Karussell-Element.
// `className`: Zusätzliche CSS-Klassen für den Button.
// `variant`, `size`: Props, die an die `Button`-Komponente weitergeleitet werden.
// `ref`: Eine Referenz, die an das zugrunde liegende `button`-Element weitergeleitet wird.
const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2" // Positionierung für horizontale Karussells.
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90", // Positionierung für vertikale Karussells mit Rotation.
        className
      )}
      onClick={scrollNext}
      disabled={!canScrollNext} // Deaktiviert den Button, wenn nicht mehr gescrollt werden kann.
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span> {/* Für Barrierefreiheit */} 
    </Button>
  )
})
// Setzt den Anzeigenamen für die `CarouselNext`-Komponente.
CarouselNext.displayName = "CarouselNext"

// Exportiert alle Karussell-Komponenten zur Verwendung in anderen Teilen der Anwendung.
export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
