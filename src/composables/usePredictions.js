import { reactive, watch } from 'vue'

const STORAGE_KEY = 'wc2026-pronostics-v1'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        predictions: parsed.predictions || {},
        results: parsed.results || {},
        // `auto` : ids des matchs dont le score réel a été pré-rempli
        // automatiquement (et non saisi à la main).
        auto: parsed.auto || {}
      }
    }
  } catch (e) {
    console.warn('Impossible de lire les pronostics enregistrés :', e)
  }
  return { predictions: {}, results: {}, auto: {} }
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
  for (const id of Object.keys(store.auto)) delete store.auto[id]
}

// Remplace tout le contenu (import depuis un fichier). Les scores importés
// sont considérés comme saisis manuellement (on efface les marqueurs auto).
export function replaceAll({ predictions, results } = {}) {
  for (const id of Object.keys(store.predictions)) delete store.predictions[id]
  for (const id of Object.keys(store.results)) delete store.results[id]
  for (const id of Object.keys(store.auto)) delete store.auto[id]
  Object.assign(store.predictions, predictions || {})
  Object.assign(store.results, results || {})
}

// Applique des scores « officiels » (récupérés automatiquement). On ne touche
// qu'aux matchs sans score manuel — ou à ceux déjà remplis automatiquement,
// qu'on garde ainsi à jour si le score évolue.
export function applyOfficial(official) {
  if (!official) return 0
  let n = 0
  for (const [id, score] of Object.entries(official)) {
    if (!score || !Number.isFinite(score.h) || !Number.isFinite(score.a)) continue
    const existing = store.results[id]
    if (!existing || store.auto[id]) {
      store.results[id] = { h: score.h, a: score.a }
      store.auto[id] = true
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
