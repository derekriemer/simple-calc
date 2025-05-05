<script setup lang="ts">
import { useExpressionsStore } from '@/stores/expressions'
import ExpressionCard from './ExpressionCard.vue'
const expressionsStore = useExpressionsStore()
</script>

<template>
  <div>{{ expressionsStore.getDirtyTemp }}</div>
  <div class="expressions-list">
    <ul>
      <ExpressionCard v-for="(expression, index) in expressionsStore.expressions" :key="index" :expression="expression"
        :index="index" />
    </ul>
  </div>
</template>

<style scoped>
.expressions-list {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}

ul {
  list-style-type: none;
  padding: 0;
}
</style>
