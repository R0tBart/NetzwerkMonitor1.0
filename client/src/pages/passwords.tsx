import { useState } from "react";
// Importiert Hooks von React Query für Datenabfragen und -mutationen.
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// Importiert UI-Komponenten von Shadcn/ui.
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
// Importiert Icons von lucide-react.
import { Plus, Shield, Key, Edit, Trash2, Eye, EyeOff, Copy, Star, ExternalLink, Lock } from "lucide-react";
// Importiert Hooks und Resolver für die Formularverwaltung mit React Hook Form und Zod.
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// Importiert Hilfsfunktionen für API-Anfragen und Toast-Benachrichtigungen.
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
// Importiert Typdefinitionen für Passwort-Tresore und -Einträge.
import type { PasswordVault, PasswordEntry, InsertPasswordVault, InsertPasswordEntry } from "@shared/schema";
// Importiert die Sidebar-Komponente für das Layout.
import Sidebar from "@/components/layout/sidebar";

// Zod-Schema für die Validierung von Passworteinträgen.
const passwordEntrySchema = z.object({
  vaultId: z.number(), // ID des Tresors, zu dem der Eintrag gehört.
  title: z.string().min(1, "Titel ist erforderlich"), // Titel des Eintrags.
  username: z.string().optional(), // Optionaler Benutzername.
  email: z.string().email("Ungültige E-Mail-Adresse").optional().or(z.literal("")), // Optionale E-Mail-Adresse mit Validierung.
  encryptedPassword: z.string().min(1, "Passwort ist erforderlich"), // Verschlüsseltes Passwort.
  website: z.string().url("Ungültige URL").optional().or(z.literal("")), // Optionale Website-URL mit Validierung.
  notes: z.string().optional(), // Optionale Notizen.
  category: z.string().optional(), // Optionale Kategorie.
  isFavorite: z.boolean().default(false), // Kennzeichnet, ob der Eintrag ein Favorit ist.
});

// Zod-Schema für die Validierung von Passwort-Tresoren.
const vaultSchema = z.object({
  name: z.string().min(1, "Name ist erforderlich"), // Name des Tresors.
  description: z.string().optional(), // Optionale Beschreibung des Tresors.
});

// Typableitungen für die Formular-Daten.
type FormData = z.infer<typeof passwordEntrySchema>;
type VaultFormData = z.infer<typeof vaultSchema>;

/**
 * Die `Passwords`-Komponente verwaltet Passwort-Tresore und -Einträge.
 * Sie ermöglicht das Erstellen, Bearbeiten, Löschen und Anzeigen von Passwörtern.
 */
export default function Passwords() {
  // Zustandsvariablen für die UI-Logik.
  const [selectedVault, setSelectedVault] = useState<number | null>(null); // Der aktuell ausgewählte Tresor.
  const [showPassword, setShowPassword] = useState<{ [key: number]: boolean }>({}); // Sichtbarkeit von Passwörtern.
  const [entryDialogOpen, setEntryDialogOpen] = useState(false); // Zustand des Dialogs für Passworteinträge.
  const [vaultDialogOpen, setVaultDialogOpen] = useState(false); // Zustand des Dialogs für Tresore.
  const [editingEntry, setEditingEntry] = useState<PasswordEntry | null>(null); // Der aktuell bearbeitete Passworteintrag.
  const { toast } = useToast(); // Hook für Toast-Benachrichtigungen.
  const queryClient = useQueryClient(); // React Query Client für Cache-Invalidierung.

  // React Query Abfragen (Queries).
  // Abfrage zum Abrufen aller Passwort-Tresore.
  const { data: vaults = [], isLoading: vaultsLoading } = useQuery<PasswordVault[]>({
    queryKey: ["/api/password-vaults"],
  });

  // Abfrage zum Abrufen von Passworteinträgen basierend auf dem ausgewählten Tresor.
  const { data: entries = [], isLoading: entriesLoading } = useQuery<PasswordEntry[]>({
    queryKey: ["/api/password-entries", selectedVault],
    enabled: !!selectedVault, // Diese Abfrage wird nur ausgeführt, wenn ein Tresor ausgewählt ist.
  });

  // React Hook Form-Initialisierung für Passworteinträge.
  const entryForm = useForm<FormData>({
    resolver: zodResolver(passwordEntrySchema), // Verwendet Zod zur Validierung des Formulars.
    defaultValues: {
      vaultId: selectedVault ?? undefined, // Setzt die Tresor-ID basierend auf der Auswahl.
      title: "",
      username: "",
      email: "",
      encryptedPassword: "",
      website: "",
      notes: "",
      category: "",
      isFavorite: false,
    },
  });

  // Mutation zum Löschen eines Passwort-Tresors.
  const deleteVaultMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/password-vaults/${id}`), // API-Anfrage zum Löschen.
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/password-vaults"] }); // Invalidiert den Cache für Tresore.
      toast({ title: "Tresor gelöscht", description: "Der Passwort-Tresor wurde erfolgreich gelöscht." }); // Erfolgsmeldung.
      setSelectedVault(null); // Setzt den ausgewählten Tresor zurück.
    },
  });

  // React Hook Form-Initialisierung für Tresore.
  const vaultForm = useForm<VaultFormData>({
    resolver: zodResolver(vaultSchema), // Verwendet Zod zur Validierung des Formulars.
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // React Query Mutationen.
  // Mutation zum Erstellen eines neuen Tresors.
  const createVaultMutation = useMutation({
    mutationFn: (data: InsertPasswordVault) => apiRequest("POST", "/api/password-vaults", data), // API-Anfrage zum Erstellen.
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/password-vaults"] }); // Invalidiert den Cache für Tresore.
      setVaultDialogOpen(false); // Schließt den Dialog.
      vaultForm.reset(); // Setzt das Formular zurück.
      toast({ title: "Tresor erstellt", description: "Der Passwort-Tresor wurde erfolgreich erstellt." }); // Erfolgsmeldung.
    },
  });

  // Mutation zum Erstellen eines neuen Passworteintrags.
  const createEntryMutation = useMutation({
    mutationFn: (data: InsertPasswordEntry) => apiRequest("POST", "/api/password-entries", data), // API-Anfrage zum Erstellen.
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/password-entries", selectedVault] }); // Invalidiert den Cache für Einträge.
      setEntryDialogOpen(false); // Schließt den Dialog.
      entryForm.reset(); // Setzt das Formular zurück.
      setEditingEntry(null); // Setzt den Bearbeitungsmodus zurück.
      toast({ title: "Passwort gespeichert", description: "Das Passwort wurde erfolgreich hinzugefügt." }); // Erfolgsmeldung.
    },
  });

  // Mutation zum Aktualisieren eines Passworteintrags.
  const updateEntryMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<InsertPasswordEntry> }) =>
      apiRequest("PUT", `/api/password-entries/${id}`, data), // API-Anfrage zum Aktualisieren.
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/password-entries", selectedVault] }); // Invalidiert den Cache für Einträge.
      setEntryDialogOpen(false); // Schließt den Dialog.
      entryForm.reset(); // Setzt das Formular zurück.
      setEditingEntry(null); // Setzt den Bearbeitungsmodus zurück.
      toast({ title: "Passwort aktualisiert", description: "Das Passwort wurde erfolgreich aktualisiert." }); // Erfolgsmeldung.
    },
  });

  // Mutation zum Löschen eines Passworteintrags.
  const deleteEntryMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/password-entries/${id}`), // API-Anfrage zum Löschen.
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/password-entries", selectedVault] }); // Invalidiert den Cache für Einträge.
      toast({ title: "Passwort gelöscht", description: "Das Passwort wurde erfolgreich gelöscht." }); // Erfolgsmeldung.
    },
  });

  /**
   * Behandelt das Absenden des Formulars für Passworteinträge.
   * Unterscheidet zwischen Erstellen und Aktualisieren eines Eintrags.
   * @param data Die Formulardaten des Passworteintrags.
   */
  const onSubmitEntry = (data: FormData) => {
    if (editingEntry) {
      updateEntryMutation.mutate({ id: editingEntry.id, data }); // Aktualisiert einen bestehenden Eintrag.
    } else {
      createEntryMutation.mutate(data); // Erstellt einen neuen Eintrag.
    }
  };

  /**
   * Behandelt das Absenden des Formulars für Tresore.
   * Erstellt einen neuen Tresor.
   * @param data Die Formulardaten des Tresors.
   */
  const onSubmitVault = (data: VaultFormData) => {
    createVaultMutation.mutate(data); // Erstellt einen neuen Tresor.
  };

  /**
   * Behandelt das Löschen eines Tresors.
   * Fragt zur Bestätigung nach und löscht dann den Tresor und alle zugehörigen Einträge.
   * @param vaultId Die ID des zu löschenden Tresors.
   */
  const handleDeleteVault = (vaultId: number) => {
    if (window.confirm("Sind Sie sicher, dass Sie diesen Tresor löschen möchten? Alle darin enthaltenen Passwörter werden ebenfalls gelöscht.")) {
      deleteVaultMutation.mutate(vaultId); // Führt die Löschmutation aus.
    }
  };

  /**
   * Schaltet die Sichtbarkeit eines Passworts um.
   * @param entryId Die ID des Eintrags, dessen Passwortsichtbarkeit umgeschaltet werden soll.
   */
  const togglePasswordVisibility = (entryId: number) => {
    setShowPassword(prev => ({ ...prev, [entryId]: !prev[entryId] })); // Aktualisiert den Zustand der Sichtbarkeit.
  };

  /**
   * Generiert ein zufälliges, starkes Passwort.
   * @param length Die gewünschte Länge des Passworts (Standard: 16).
   * @returns Ein zufällig generiertes Passwort.
   */
  const generatePassword = (length: number = 16) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"; // Zeichensatz für das Passwort.
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length)); // Wählt zufällige Zeichen aus.
    }
    return password;
  };

  /**
   * Behandelt das Generieren eines Passworts und setzt es in das Formularfeld ein.
   */
  const handleGeneratePassword = () => {
    const newPassword = generatePassword(16); // Generiert ein neues Passwort.
    entryForm.setValue("encryptedPassword", newPassword); // Setzt das generierte Passwort in das Formularfeld.
    toast({ title: "Passwort generiert", description: `Ein starkes Passwort wurde generiert: ${newPassword}` }); // Benachrichtigung über generiertes Passwort.
  };

  /**
   * Kopiert Text in die Zwischenablage.
   * @param text Der zu kopierende Text.
   * @param type Der Typ des kopierten Inhalts (z.B. "Passwort", "Benutzername").
   */
  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text); // Versucht, den Text in die Zwischenablage zu kopieren.
      toast({ title: "Kopiert", description: `${type} wurde in die Zwischenablage kopiert.` }); // Erfolgsmeldung.
    } catch (error) {
      toast({ 
        title: "Fehler", 
        description: "Konnte nicht in die Zwischenablage kopieren.", 
        variant: "destructive" 
      }); // Fehlermeldung.
    }
  };

  /**
   * Bereitet das Formular für die Bearbeitung eines bestehenden Passworteintrags vor.
   * @param entry Der zu bearbeitende Passworteintrag.
   */
  const handleEditEntry = (entry: PasswordEntry) => {
    setEditingEntry(entry); // Setzt den Eintrag, der bearbeitet werden soll.
    entryForm.reset({
      vaultId: entry.vaultId,
      title: entry.title,
      username: entry.username || "",
      email: entry.email || "",
      encryptedPassword: entry.encryptedPassword,
      website: entry.website || "",
      notes: entry.notes || "",
      category: entry.category || "",
      isFavorite: entry.isFavorite,
    }); // Setzt die Formularwerte auf die des Eintrags.
    setEntryDialogOpen(true); // Öffnet den Dialog für den Passworteintrag.
  };

  // Setzt den Standard-Tresor, wenn Tresore geladen werden und noch keiner ausgewählt ist.
  if (vaults && vaults.length > 0 && !selectedVault) {
    setSelectedVault(vaults[0].id);
  }

  return (
    // Hauptcontainer der Seite mit Sidebar und Hauptinhaltsbereich.
    <div className="flex h-screen bg-slate-50 dark:bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-6 space-y-6">
          {/* Header-Bereich mit Titel und Beschreibung. */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Passwort-Manager</h1>
              <p className="text-muted-foreground">
                Sichere Verwaltung Ihrer Netzwerk-Zugangsdaten und Passwörter
              </p>
            </div>
            {/* Buttons zum Erstellen eines neuen Tresors und eines neuen Passworts. */}
            <div className="flex gap-2">
              {/* Dialog zum Erstellen eines neuen Tresors. */}
              <Dialog open={vaultDialogOpen} onOpenChange={setVaultDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    Neuer Tresor
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Neuen Passwort-Tresor erstellen</DialogTitle>
                    <DialogDescription>
                      Erstellen Sie einen neuen Tresor für Ihre Passwörter
                    </DialogDescription>
                  </DialogHeader>
                  {/* Formular zum Erstellen eines Tresors. */}
                  <Form {...vaultForm}>
                    <form onSubmit={vaultForm.handleSubmit(onSubmitVault)} className="space-y-4">
                      <FormField
                        control={vaultForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="z.B. Netzwerk-Tresor" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={vaultForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Beschreibung</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Kurze Beschreibung des Tresors..." 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button type="submit" disabled={createVaultMutation.isPending}>
                          Tresor erstellen
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>

              {/* Dialog zum Erstellen/Bearbeiten eines Passworteintrags. */}
              <Dialog open={entryDialogOpen} onOpenChange={setEntryDialogOpen}>
                <DialogTrigger asChild>
                  <Button disabled={!selectedVault}>
                    <Plus className="h-4 w-4 mr-2" />
                    Neues Passwort
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingEntry ? "Passwort bearbeiten" : "Neues Passwort hinzufügen"}
                    </DialogTitle>
                    <DialogDescription>
                      Fügen Sie ein neues Passwort zu Ihrem Tresor hinzu
                    </DialogDescription>
                  </DialogHeader>
                  {/* Formular für Passworteinträge. */}
                  <Form {...entryForm}>
                    <form onSubmit={entryForm.handleSubmit(onSubmitEntry)} className="space-y-4">
                      {/* Verstecktes Feld für die vaultId. */}
                      <FormField
                        control={entryForm.control}
                        name="vaultId"
                        render={({ field }) => (
                          <input type="hidden" {...field} value={selectedVault || vaults[0]?.id || 1} />
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={entryForm.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Titel *</FormLabel>
                              <FormControl>
                                <Input placeholder="z.B. Router Admin" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={entryForm.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Kategorie</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Kategorie wählen" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Network Equipment">Netzwerk-Geräte</SelectItem>
                                  <SelectItem value="Security">Sicherheit</SelectItem>
                                  <SelectItem value="Server">Server</SelectItem>
                                  <SelectItem value="Database">Datenbank</SelectItem>
                                  <SelectItem value="Other">Sonstiges</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={entryForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Benutzername</FormLabel>
                              <FormControl>
                                <Input placeholder="admin" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={entryForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>E-Mail</FormLabel>
                              <FormControl>
                                <Input placeholder="admin@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={entryForm.control}
                        name="encryptedPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Passwort *</FormLabel>
                            <div className="flex gap-2">
                              <FormControl>
                      <Input type={showPassword[0] ? "text" : "password"} {...field} />
                              </FormControl>
                <div className="flex items-center space-x-2">
                  <Button type="button" onClick={handleGeneratePassword}>
                    Passwort generieren
                  </Button>
                  <FormField
                    control={entryForm.control}
                    name="encryptedPassword"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Passwort anzeigen</FormLabel>
                          <CardDescription>
                            Zeigt das generierte Passwort im Eingabefeld an.
                          </CardDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={showPassword[0] || false} // Use a dummy ID like 0 for generated password visibility
                            onCheckedChange={() => togglePasswordVisibility(0)}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={entryForm.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Website/URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://192.168.1.1" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={entryForm.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Notizen</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Zusätzliche Informationen..." 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={entryForm.control}
                        name="isFavorite"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Favorit</FormLabel>
                              <div className="text-[0.8rem] text-muted-foreground">
                                Als Favorit markieren für schnellen Zugriff
                              </div>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <DialogFooter>
                        <Button type="submit" disabled={createEntryMutation.isPending || updateEntryMutation.isPending}>
                          {editingEntry ? "Aktualisieren" : "Hinzufügen"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Vault Selector */}
            <Card>
              <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Passwort-Tresore</CardTitle>
            {selectedVault && (
              <Button variant="destructive" size="sm" onClick={() => handleDeleteVault(selectedVault)}>
                <Trash2 className="mr-2 h-4 w-4" /> Tresor löschen
              </Button>
            )}
          </div>
          <CardDescription>Verwalten Sie Ihre Passwort-Tresore.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {vaultsLoading ? (
                  <div>Lädt...</div>
                ) : (
                  vaults.map((vault: PasswordVault) => (
                    <Card 
                      key={vault.id} 
                      className={`cursor-pointer transition-colors ${
                        selectedVault === vault.id 
                          ? "border-primary bg-primary/5" 
                          : "hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedVault(vault.id)}
                    >
                      <CardContent className="p-3">
                        <div className="font-medium">{vault.name}</div>
                        {vault.description && (
                          <div className="text-sm text-muted-foreground mt-1">
                            {vault.description}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Password Entries */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-4 w-4" />
                    Passwörter
                    {selectedVault && (
                      <Badge variant="secondary">
                        {entries.filter((e: PasswordEntry) => e.isFavorite).length} Favoriten
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    Ihre gespeicherten Zugangsdaten
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {entriesLoading ? (
                    <div>Lädt Passwörter...</div>
                  ) : entries.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Lock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Keine Passwörter in diesem Tresor</p>
                      <p className="text-sm">Fügen Sie Ihr erstes Passwort hinzu</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {entries.map((entry: PasswordEntry) => (
                        <Card key={entry.id} className="border">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="font-medium">{entry.title}</h3>
                                  {entry.isFavorite && (
                                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                  )}
                                  {entry.category && (
                                    <Badge variant="outline" className="text-xs">
                                      {entry.category}
                                    </Badge>
                                  )}
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  {entry.username && (
                                    <div>
                                      <span className="text-muted-foreground">Benutzername:</span>
                                      <div className="flex items-center gap-2">
                                        <span className="font-mono">{entry.username}</span>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="h-6 w-6 p-0"
                                          onClick={() => copyToClipboard(entry.username!, "Benutzername")}
                                        >
                                          <Copy className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  )}

                                  {entry.email && (
                                    <div>
                                      <span className="text-muted-foreground">E-Mail:</span>
                                      <div className="flex items-center gap-2">
                                        <span className="font-mono">{entry.email}</span>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="h-6 w-6 p-0"
                                          onClick={() => copyToClipboard(entry.email!, "E-Mail")}
                                        >
                                          <Copy className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  )}

                                  <div>
                                    <span className="text-muted-foreground">Passwort:</span>
                                    <div className="flex items-center gap-2">
                                      <span className="font-mono">
                                        {showPassword[entry.id] 
                                          ? entry.encryptedPassword 
                                          : "••••••••••••"
                                        }
                                      </span>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-6 w-6 p-0"
                                        onClick={() => togglePasswordVisibility(entry.id)}
                                      >
                                        {showPassword[entry.id] ? (
                                          <EyeOff className="h-3 w-3" />
                                        ) : (
                                          <Eye className="h-3 w-3" />
                                        )}
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-6 w-6 p-0"
                                        onClick={() => copyToClipboard(entry.encryptedPassword, "Passwort")}
                                      >
                                        <Copy className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </div>

                                  {entry.website && (
                                    <div>
                                      <span className="text-muted-foreground">Website:</span>
                                      <div className="flex items-center gap-2">
                                        <a 
                                          href={entry.website} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="text-blue-600 hover:underline font-mono text-sm"
                                        >
                                          {entry.website}
                                        </a>
                                        <ExternalLink className="h-3 w-3 text-muted-foreground" />
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {entry.notes && (
                                  <div className="mt-3 pt-3 border-t">
                                    <span className="text-muted-foreground text-sm">Notizen:</span>
                                    <p className="text-sm mt-1">{entry.notes}</p>
                                  </div>
                                )}
                              </div>

                              <div className="flex gap-2 ml-4">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleEditEntry(entry)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => deleteEntryMutation.mutate(entry.id)}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}