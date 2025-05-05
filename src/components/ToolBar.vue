<script setup lang="ts">
import { useExpressionsStore } from '@/stores/expressions'


const expressions = useExpressionsStore()

const evaluate = async () => {
  const success = await expressions.evaluateExpressions()
  if (success) {
    expressions.addEmptyExpression()
  }
}
</script>

<template>
  <div role="toolbar">
    <button @click="expressions.addEmptyExpression">
      Add
    </button>
    <button class="evaluate" @click="evaluate">
      Evaluate All
    </button>
  </div>
</template>
