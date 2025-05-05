<script setup lang="ts">
import ExpressionsList from '../components/ExpressionsList.vue'
import Toolbar from '../components/Toolbar.vue'
import { useExpressionsStore } from '@/stores/expressions'

const expressionsStore = useExpressionsStore()

function handleKeypress(event: KeyboardEvent) {
  expressionsStore.addEmptyExpression()
}
</script>

<template>
  <main @keyup.ctrl.m.prevent="handleKeypress" @keyup.ctrl.enter.prevent="expressionsStore.evaluateExpressions()">
    <ExpressionsList />
    <Toolbar />
  </main>
</template>

<style scoped>
main {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(100px, 50vh) auto auto;
  gap: 1rem;
  grid-template-areas:
    'expressions'
    'result'
    'input';
}

.expressions {
  grid-area: expressions;
  overflow-y: auto;
  width: 100%;
}

.result {
  grid-area: result;
}

.calc-input {
  grid-area: input;
}

@media (min-width: 768px) {
  main {
    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto auto;
    grid-template-areas:
      'expressions result'
      'expressions input';
  }
}
</style>
