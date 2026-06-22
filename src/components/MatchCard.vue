<script setup>
import { computed } from 'vue'
import { getTeam } from '../data/teams.js'
import { formatDate, formatTime, hasStarted } from '../utils/datetime.js'
import { matchPoints } from '../utils/scoring.js'

const props = defineProps({
  match: { type: Object, required: true },
  matchday: { type: Number, required: true },
  store: { type: Object, required: true }
})

const home = computed(() => getTeam(props.match.home))
const away = computed(() => getTeam(props.match.away))
const date = computed(() => formatDate(props.match.kickoff))
const time = computed(() => formatTime(props.match.kickoff))

const pred = computed(() => props.store.predictions[props.match.id])
const result = computed(() => props.store.results[props.match.id])

// Une fois le coup d'envoi passé, le pronostic est verrouillé.
const started = computed(() => hasStarted(props.match.kickoff))
const points = computed(() => matchPoints(pred.value, result.value))

const state = computed(() => {
  if (points.value !== null) return 'played'
  if (started.value) return 'live'
  return 'upcoming'
})

const pointsLabel = computed(() =>
  points.value === null ? '' : points.value > 0 ? `+${points.value}` : '0'
)
const pointsClass = computed(() => {
  if (points.value === 3) return 'points--exact'
  if (points.value === 1) return 'points--correct'
  return 'points--miss'
})

function read(map, side) {
  const o = props.store[map][props.match.id]
  return o && Number.isFinite(o[side]) ? o[side] : ''
}

// Saisie du pronostic uniquement (le score réel est en lecture seule).
function writePrediction(side, raw) {
  if (started.value) return
  const id = props.match.id
  let v = raw === '' || raw == null ? null : Math.floor(Number(raw))
  if (v !== null && (!Number.isFinite(v) || v < 0)) v = 0
  const cur = props.store.predictions[id] ? { ...props.store.predictions[id] } : { h: null, a: null }
  cur[side] = v
  if (cur.h == null && cur.a == null) delete props.store.predictions[id]
  else props.store.predictions[id] = cur
}
</script>

<template>
  <article class="match" :class="`match--${state}`">
    <div class="match__meta">
      <span class="match__date">{{ date }}</span>
      <span class="match__dot">·</span>
      <span class="match__time">{{ time }}</span>
      <span class="match__tz">Paris</span>
      <span class="match__md">J{{ matchday }}</span>
    </div>

    <div class="match__grid">
      <div class="team team--home">
        <span class="team__name">{{ home.name }}</span>
        <span class="team__flag">{{ home.flag }}</span>
      </div>

      <div class="cols">
        <span class="cols__label">
          Pronostic
          <span v-if="started" class="cols__lock" title="Match commencé : pronostic verrouillé">🔒</span>
        </span>
        <span class="cols__label">Score réel</span>

        <div class="score">
          <input
            class="score__in"
            type="number"
            min="0"
            inputmode="numeric"
            :value="read('predictions', 'h')"
            :disabled="started"
            @input="writePrediction('h', $event.target.value)"
            aria-label="Pronostic domicile"
          />
          <span class="score__sep">–</span>
          <input
            class="score__in"
            type="number"
            min="0"
            inputmode="numeric"
            :value="read('predictions', 'a')"
            :disabled="started"
            @input="writePrediction('a', $event.target.value)"
            aria-label="Pronostic extérieur"
          />
        </div>

        <div class="score score--result">
          <input
            class="score__in score__in--ro"
            type="number"
            :value="read('results', 'h')"
            readonly
            tabindex="-1"
            aria-label="Score réel domicile"
          />
          <span class="score__sep">–</span>
          <input
            class="score__in score__in--ro"
            type="number"
            :value="read('results', 'a')"
            readonly
            tabindex="-1"
            aria-label="Score réel extérieur"
          />
        </div>
      </div>

      <div class="team team--away">
        <span class="team__flag">{{ away.flag }}</span>
        <span class="team__name">{{ away.name }}</span>
      </div>
    </div>

    <div class="match__points">
      <span v-if="points !== null" class="points" :class="pointsClass">
        {{ pointsLabel }} pt<span v-if="points > 1">s</span>
      </span>
      <span v-else-if="started" class="points points--live">En attente du score</span>
      <span v-else class="points points--soon">À venir</span>
    </div>
  </article>
</template>
