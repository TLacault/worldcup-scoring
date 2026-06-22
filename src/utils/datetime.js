// Mise en forme des dates/heures à l'heure de Paris (fr-FR).
// Les coups d'envoi sont stockés en UTC ; Intl gère le fuseau Europe/Paris
// et le passage de minuit.

const dateFmt = new Intl.DateTimeFormat('fr-FR', {
  timeZone: 'Europe/Paris',
  weekday: 'short',
  day: 'numeric',
  month: 'long'
})

const timeFmt = new Intl.DateTimeFormat('fr-FR', {
  timeZone: 'Europe/Paris',
  hour: '2-digit',
  minute: '2-digit'
})

const dayKeyFmt = new Intl.DateTimeFormat('fr-CA', {
  timeZone: 'Europe/Paris',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
})

export function formatDate(iso) {
  return dateFmt.format(new Date(iso))
}

export function formatTime(iso) {
  return timeFmt.format(new Date(iso))
}

// Clé de jour (AAAA-MM-JJ) heure de Paris, pratique pour regrouper/comparer.
export function dayKey(iso) {
  return dayKeyFmt.format(new Date(iso))
}

// Le match a-t-il déjà commencé (heure du coup d'envoi passée) ?
export function hasStarted(iso) {
  return new Date(iso).getTime() <= Date.now()
}
