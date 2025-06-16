"use client"

// Importiert React für die Komponentendefinition.
import * as React from "react"
// Importiert `LabelPrimitive` von Radix UI für grundlegende Label-Funktionalität.
import * as LabelPrimitive from "@radix-ui/react-label"
// Importiert `Slot` von Radix UI, um Props an das Kind-Element weiterzuleiten.
import { Slot } from "@radix-ui/react-slot"
// Importiert Komponenten und Typen von `react-hook-form` für die Formularverwaltung.
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

// Importiert die `cn`-Hilfsfunktion zum Zusammenführen von Klassennamen.
import { cn } from "@/lib/utils"
// Importiert die `Label`-Komponente aus den UI-Komponenten.
import { Label } from "@/components/ui/label"

// Definiert die `Form`-Komponente als Alias für `FormProvider` von `react-hook-form`.
const Form = FormProvider

// Definiert den Typ für den Kontextwert des Formularfeldes.
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

// Erstellt einen React-Kontext für Formularfeld-Informationen.
const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

// Definiert die `FormField`-Komponente.
// Diese Komponente stellt den Kontext für ein einzelnes Formularfeld bereit und rendert einen `Controller`.
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

// `useFormField` ist ein Hook, der den Kontext eines Formularfeldes und Formularstatusinformationen bereitstellt.
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  // Wirft einen Fehler, wenn der Hook außerhalb eines `FormField` verwendet wird.
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

// Definiert den Typ für den Kontextwert eines Formular-Items.
type FormItemContextValue = {
  id: string
}

// Erstellt einen React-Kontext für Formular-Item-Informationen.
const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

// Definiert die `FormItem`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und dient als Container für ein Formularfeld.
// `className`: Zusätzliche CSS-Klassen.
const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
// Setzt den Anzeigenamen für die `FormItem`-Komponente.
FormItem.displayName = "FormItem"

// Definiert die `FormLabel`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert ein `Label` für ein Formularfeld.
// `className`: Zusätzliche CSS-Klassen.
const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
// Setzt den Anzeigenamen für die `FormLabel`-Komponente.
FormLabel.displayName = "FormLabel"

// Definiert die `FormControl`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert einen `Slot` für das Formular-Eingabeelement.
const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
// Setzt den Anzeigenamen für die `FormControl`-Komponente.
FormControl.displayName = "FormControl"

// Definiert die `FormDescription`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert einen Paragraphen für die Beschreibung eines Formularfeldes.
// `className`: Zusätzliche CSS-Klassen.
const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
// Setzt den Anzeigenamen für die `FormDescription`-Komponente.
FormDescription.displayName = "FormDescription"

// Definiert die `FormMessage`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert Fehlermeldungen für ein Formularfeld.
// `className`: Zusätzliche CSS-Klassen.
// `children`: Die Kind-Elemente, die als Nachricht gerendert werden sollen.
// Definiert die `FormMessage`-Komponente.
// Diese Komponente ist ein `React.forwardRef` und rendert Fehlermeldungen für ein Formularfeld.
// `className`: Zusätzliche CSS-Klassen.
// `children`: Die Kind-Elemente, die als Nachricht gerendert werden sollen.
const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  // Zeigt die Fehlermeldung oder die übergebenen Kinder an.
  const body = error ? String(error?.message ?? "") : children

  // Rendert nichts, wenn keine Nachricht vorhanden ist.
  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>

  )
})
// Setzt den Anzeigenamen für die `FormMessage`-Komponente.
FormMessage.displayName = "FormMessage"

// Exportiert alle Formular-bezogenen Komponenten und Hooks zur Verwendung in anderen Teilen der Anwendung.
export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}

