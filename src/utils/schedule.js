// Outils de planning partagés par la vue « par groupe » et la vue « par date ».
import { dayKey } from './datetime.js'

const byKickoff = (a, b) => new Date(a.kickoff) - new Date(b.kickoff)

// Associe à chaque match sa journée (J1/J2/J3). La journée se déduit de
// l'ordre chronologique au sein du groupe : 2 matchs par journée.
export function matchdayMap(matches) {
  const groups = {}
  for (const m of matches) (groups[m.group] ||= []).push(m)
  const map = {}
  for (const list of Object.values(groups)) {
    ;[...list].sort(byKickoff).forEach((m, i) => {
      map[m.id] = Math.floor(i / 2) + 1
    })
  }
  return map
}

const dayLabelFmt = new Intl.DateTimeFormat('fr-FR', {
  timeZone: 'Europe/Paris',
  weekday: 'long',
  day: 'numeric',
  month: 'long'
})

// Regroupe les matchs par jour (heure de Paris), triés chronologiquement.
// Renvoie un tableau de { key, label, matches }.
export function byDay(matches) {
  const buckets = new Map()
  for (const m of [...matches].sort(byKickoff)) {
    const key = dayKey(m.kickoff)
    if (!buckets.has(key)) {
      buckets.set(key, {
        key,
        label: dayLabelFmt.format(new Date(m.kickoff)),
        matches: []
      })
    }
    buckets.get(key).matches.push(m)
  }
  return [...buckets.values()]
}
