<script setup lang="ts">
import { useExpressionsStore } from '@/stores/expressions'



const expressions = useExpressionsStore()


const add = () => {
  expressions.addEmptyExpression()
}

const evaluate = async () => {
  const success = await expressions.evaluateExpressions()
  if (success) {
    expressions.addEmptyExpression()
  }
}

defineExpose({
  add,
  evaluate,
})
</script>

<template>
  <div role="toolbar">
    <button @click="add">
      Add
    </button>
    <button class="evaluate" @click="evaluate">
      Evaluate All
    </button>
  </div>
</template>
