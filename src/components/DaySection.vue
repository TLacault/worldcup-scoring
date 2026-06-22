<script setup>
import { computed, ref } from 'vue'
import MatchCard from './MatchCard.vue'
import { hasStarted } from '../utils/datetime.js'
import { tally } from '../utils/scoring.js'

const props = defineProps({
  day: { type: Object, required: true },
  store: { type: Object, required: true },
  matchdays: { type: Object, required: true },
  filter: { type: String, default: 'all' }
})

const open = ref(true)

const visible = computed(() =>
  props.day.matches.filter((m) => {
    if (props.filter === 'upcoming') return !hasStarted(m.kickoff)
    if (props.filter === 'past') return hasStarted(m.kickoff)
    return true
  })
)

const stats = computed(() => tally(props.day.matches, props.store.predictions, props.store.results))
</script>

<template>
  <section v-if="visible.length" class="group day">
    <button class="group__head" @click="open = !open" :aria-expanded="open">
      <span class="day__badge">📅</span>
      <span class="group__title">{{ day.label }}</span>
      <span class="day__count">{{ visible.length }} match<span v-if="visible.length > 1">s</span></span>
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
