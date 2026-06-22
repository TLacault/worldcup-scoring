<script setup>
import { computed, ref } from 'vue'
import MatchCard from './MatchCard.vue'
import { getTeam } from '../data/teams.js'
import { hasStarted } from '../utils/datetime.js'
import { tally } from '../utils/scoring.js'

const props = defineProps({
  group: { type: Object, required: true },
  matches: { type: Array, required: true },
  store: { type: Object, required: true },
  matchdays: { type: Object, required: true },
  filter: { type: String, default: 'all' }
})

const open = ref(true)

const ordered = computed(() =>
  [...props.matches].sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff))
)

const visible = computed(() =>
  ordered.value.filter((m) => {
    if (props.filter === 'upcoming') return !hasStarted(m.kickoff)
    if (props.filter === 'past') return hasStarted(m.kickoff)
    return true
  })
)

const flags = computed(() => props.group.teams.map((c) => getTeam(c).flag))
const stats = computed(() => tally(props.matches, props.store.predictions, props.store.results))
</script>

<template>
  <section v-if="visible.length" class="group" :id="`groupe-${group.id}`">
    <button class="group__head" @click="open = !open" :aria-expanded="open">
      <span class="group__badge">{{ group.id }}</span>
      <span class="group__title">Groupe {{ group.id }}</span>
      <span class="group__flags">
        <span v-for="(f, i) in flags" :key="i">{{ f }}</span>
      </span>
      <span class="group__pts" v-if="stats.played">{{ stats.total }} pts</span>
      <span class="group__chevron" :class="{ 'is-open': open }">⌄</span>
    </button>

    <div class="group__matches" v-show="open">
      <MatchCard
        v-for="m in visible"
        :key="m.id"
        :match="m"
        :matchday="matchdays[m.id]"
        :store="store"
      />
    </div>
  </section>
</template>
