import { reactive, watch } from 'vue'

const STORAGE_KEY = 'wc2026-pronostics-v1'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        predictions: parsed.predictions || {},
        // Les scores réels proviennent uniquement du flux automatique
        // (results.json) : ils sont en lecture seule dans l'interface.
        results: parsed.results || {}
      }
    }
  } catch (e) {
    console.warn('Impossible de lire les pronostics enregistrés :', e)
  }
  return { predictions: {}, results: {} }
}

// Store unique et réactif, partagé par toute l'app et synchronisé avec
// le localStorage à chaque modification.
const store = reactive(load())

watch(
  store,
  () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
    } catch (e) {
      console.warn('Impossible d’enregistrer les pronostics :', e)
    }
  },
  { deep: true }
)

export function usePredictions() {
  return store
}

export function resetAll() {
  for (const id of Object.keys(store.predictions)) delete store.predictions[id]
  for (const id of Object.keys(store.results)) delete store.results[id]
}

// Remplace les pronostics (import depuis un fichier). Les scores réels seront
// de toute façon réécrits par le flux automatique.
export function replaceAll({ predictions, results } = {}) {
  for (const id of Object.keys(store.predictions)) delete store.predictions[id]
  for (const id of Object.keys(store.results)) delete store.results[id]
  Object.assign(store.predictions, predictions || {})
  Object.assign(store.results, results || {})
}

// Applique les scores « officiels » récupérés automatiquement.
export function applyOfficial(official) {
  if (!official) return 0
  let n = 0
  for (const [id, score] of Object.entries(official)) {
    if (!score || !Number.isFinite(score.h) || !Number.isFinite(score.a)) continue
    const cur = store.results[id]
    if (!cur || cur.h !== score.h || cur.a !== score.a) {
      store.results[id] = { h: score.h, a: score.a }
      n += 1
    }
  }
  return n
}

// Récupère le fichier de scores publié par le workflow GitHub puis l'applique.
export async function fetchOfficialResults() {
  try {
    const url = `${import.meta.env.BASE_URL}results.json?t=${Date.now()}`
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) return 0
    const data = await res.json()
    return applyOfficial(data.results || {})
  } catch (e) {
    console.warn('Scores automatiques indisponibles :', e)
    return 0
  }
}
