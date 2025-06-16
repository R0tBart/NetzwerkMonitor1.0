import * as React from "react"
// Importiert `OTPInput` und `OTPInputContext` von `input-otp` für die OTP-Eingabekomponente.
import { OTPInput, OTPInputContext } from "input-otp"
// Importiert das `Dot`-Icon von `lucide-react`.
import { Dot } from "lucide-react"

// Importiert die `cn`-Hilfsfunktion zum Zusammenführen von Klassennamen.
import { cn } from "@/lib/utils"

// Definiert die `InputOTP`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert die OTP-Eingabe.
// `className`: Zusätzliche CSS-Klassen für das Input-Feld.
// `containerClassName`: Zusätzliche CSS-Klassen für den Container des Input-Feldes.
const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
))
// Setzt den Anzeigenamen für die `InputOTP`-Komponente.
InputOTP.displayName = "InputOTP"

// Definiert die `InputOTPGroup`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und dient als Container für eine Gruppe von OTP-Slots.
// `className`: Zusätzliche CSS-Klassen.
const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
// Setzt den Anzeigenamen für die `InputOTPGroup`-Komponente.
InputOTPGroup.displayName = "InputOTPGroup"

// Definiert die `InputOTPSlot`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert einen einzelnen Slot für die OTP-Eingabe.
// `index`: Der Index des Slots.
// `className`: Zusätzliche CSS-Klassen.
const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
})
// Setzt den Anzeigenamen für die `InputOTPSlot`-Komponente.
InputOTPSlot.displayName = "InputOTPSlot"

// Definiert die `InputOTPSeparator`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert einen Trenner zwischen den OTP-Slots.
const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
))
// Setzt den Anzeigenamen für die `InputOTPSeparator`-Komponente.
InputOTPSeparator.displayName = "InputOTPSeparator"

// Exportiert die `InputOTP`, `InputOTPGroup`, `InputOTPSlot` und `InputOTPSeparator` Komponenten.
export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
