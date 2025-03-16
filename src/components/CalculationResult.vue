<script setup lang="ts">
import { useExpressionsStore } from '@/stores/expressions'
import { computed } from 'vue'

const expressionsStore = useExpressionsStore()
const cur = computed(() => expressionsStore.expression?.res)
</script>

<template>
  <div aria-live="polite" aria-atomic="true">
    <span v-if="cur">{{ cur }}</span>
    <span v-else>Type an expression, and click Calculate.</span>
  </div>
</template>
