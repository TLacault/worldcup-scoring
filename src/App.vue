<script setup>
import { computed, ref, onMounted } from 'vue'
import { groups, matches } from './data/tournament.js'
import {
  usePredictions,
  resetAll,
  replaceAll,
  fetchOfficialResults
} from './composables/usePredictions.js'
import { tally } from './utils/scoring.js'
import { matchdayMap, byDay } from './utils/schedule.js'
import ScoreBoard from './components/ScoreBoard.vue'
import GroupSection from './components/GroupSection.vue'
import DaySection from './components/DaySection.vue'

const store = usePredictions()
const filter = ref('all')
const view = ref('group')
const fileInput = ref(null)

const matchdays = matchdayMap(matches)

const matchesByGroup = computed(() => {
  const map = {}
  for (const g of groups) map[g.id] = matches.filter((m) => m.group === g.id)
  return map
})

const days = computed(() => byDay(matches))

const stats = computed(() => tally(matches, store.predictions, store.results))

const filters = [
  { id: 'all', label: 'Tous' },
  { id: 'upcoming', label: 'À venir' },
  { id: 'past', label: 'Joués' }
]

const views = [
  { id: 'group', label: 'Par groupe' },
  { id: 'date', label: 'Par date' }
]

function goToGroup(id) {
  document.getElementById(`groupe-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function reset() {
  if (confirm('Effacer tous vos pronostics et scores saisis ?')) resetAll()
}

// --- Export / import (.txt) ---
function exportPredictions() {
  const payload = {
    app: 'wc2026-pronostics',
    version: 1,
    exportedAt: new Date().toISOString(),
    predictions: store.predictions,
    results: store.results
  }
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `pronostics-cdm2026-${new Date().toISOString().slice(0, 10)}.txt`
  a.click()
  URL.revokeObjectURL(url)
}

function triggerImport() {
  fileInput.value?.click()
}

async function onImportFile(event) {
  const file = event.target.files?.[0]
  if (!file) return
  try {
    const data = JSON.parse(await file.text())
    if (!data || typeof data !== 'object' || (!data.predictions && !data.results)) {
      throw new Error('format inattendu')
    }
    if (confirm('Remplacer vos pronostics actuels par ceux du fichier ?')) {
      replaceAll({ predictions: data.predictions, results: data.results })
    }
  } catch (e) {
    alert('Fichier illisible. Utilisez un fichier exporté depuis cette application.')
  } finally {
    event.target.value = ''
  }
}

onMounted(() => {
  fetchOfficialResults()
})
</script>

<template>
  <header class="app-header">
    <div class="app-header__inner">
      <div class="brand">
        <span class="brand__ball">⚽</span>
        <div>
          <h1 class="brand__title">Pronostics — Coupe du Monde 2026</h1>
          <p class="brand__sub">Phase de groupes · 72 matchs · heure de Paris</p>
        </div>
      </div>
      <ScoreBoard :stats="stats" :total="matches.length" />
    </div>
  </header>

  <nav class="toolbar">
    <div class="toolbar__inner">
      <div class="segmented">
        <button
          v-for="v in views"
          :key="v.id"
          class="segmented__btn"
          :class="{ 'is-active': view === v.id }"
          @click="view = v.id"
        >
          {{ v.label }}
        </button>
      </div>

      <div class="segmented">
        <button
          v-for="f in filters"
          :key="f.id"
          class="segmented__btn"
          :class="{ 'is-active': filter === f.id }"
          @click="filter = f.id"
        >
          {{ f.label }}
        </button>
      </div>

      <div class="chips" v-if="view === 'group'">
        <button v-for="g in groups" :key="g.id" class="chip" @click="goToGroup(g.id)">
          {{ g.id }}
        </button>
      </div>

      <span class="toolbar__total">⚽ {{ stats.total }} pts</span>
    </div>
  </nav>

  <main class="content">
    <template v-if="view === 'group'">
      <GroupSection
        v-for="g in groups"
        :key="g.id"
        :group="g"
        :matches="matchesByGroup[g.id]"
        :store="store"
        :matchdays="matchdays"
        :filter="filter"
      />
    </template>

    <template v-else>
      <DaySection
        v-for="d in days"
        :key="d.key"
        :day="d"
        :store="store"
        :matchdays="matchdays"
        :filter="filter"
      />
    </template>
  </main>

  <footer class="app-footer">
    <div class="legend">
      <span class="legend__item"><b class="dot dot--exact"></b> Score exact = 3 pts</span>
      <span class="legend__item"><b class="dot dot--correct"></b> Bon résultat (ou nul) = 1 pt</span>
      <span class="legend__item"><b class="dot dot--miss"></b> Raté = 0 pt</span>
    </div>

    <div class="actions">
      <button class="btn" @click="exportPredictions">⬇️ Exporter (.txt)</button>
      <button class="btn" @click="triggerImport">⬆️ Importer</button>
      <button class="btn btn--danger" @click="reset">Réinitialiser</button>
      <input
        ref="fileInput"
        type="file"
        accept=".txt,.json,text/plain,application/json"
        class="hidden-file"
        @change="onImportFile"
      />
    </div>

    <p class="app-footer__note">
      Vos saisies sont enregistrées dans ce navigateur uniquement. Les scores marqués
      « auto » sont récupérés automatiquement et restent modifiables.
    </p>
  </footer>
</template>
