<script setup>
const props = defineProps({
  stats: { type: Object, required: true },
  total: { type: Number, required: true }
})
</script>

<template>
  <div class="board">
    <div class="board__total">
      <span class="board__pts">{{ stats.total }}</span>
      <span class="board__pts-label">points</span>
    </div>
    <div class="board__details">
      <div class="board__stat">
        <span class="board__num board__num--exact">{{ stats.exact }}</span>
        <span class="board__name">scores exacts</span>
        <span class="board__sub">+3 pts</span>
      </div>
      <div class="board__stat">
        <span class="board__num board__num--correct">{{ stats.correct }}</span>
        <span class="board__name">bons résultats</span>
        <span class="board__sub">+1 pt</span>
      </div>
      <div class="board__stat">
        <span class="board__num">{{ stats.played }}<small>/{{ total }}</small></span>
        <span class="board__name">matchs notés</span>
        <span class="board__sub">phase de groupes</span>
      </div>
    </div>
  </div>
</template>
