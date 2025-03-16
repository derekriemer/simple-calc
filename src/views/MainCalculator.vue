<script setup lang="ts">
import { ref } from 'vue'
import ExpressionsList from '../components/ExpressionsList.vue'
import CalculationResult from '../components/CalculationResult.vue'
import CalcInput from '../components/CalcInput.vue'
import type { Expression } from '@/models/Expression'

const inputExpression = ref('')

const updateInput = (expression: Expression) => {
  inputExpression.value = expression.expression
}
</script>

<template>
  <main>
    <ExpressionsList class="expressions" @updateInput="updateInput" />
    <CalculationResult class="result" />
    <CalcInput class="calc-input" :value="inputExpression" />
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
