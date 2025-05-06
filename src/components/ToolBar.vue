<script setup lang="ts">
import { useExpressionsStore } from '@/stores/expressions'



const expressions = useExpressionsStore()


const add = () => {
  expressions.addEmptyExpression()
}

const evaluate = async () => {
  // automatically add a new expression if editing the first one.

  const [success, canAdd] = await expressions.evaluateExpressions()
  if (canAdd && success) {
    expressions.addEmptyExpression()
  }
}

defineExpose({
  add,
  evaluate,
})
</script>

<template>
  <div role="toolbar" class="toolbar">
    <button @click="add">
      Add
    </button>
    <button class="evaluate" @click="evaluate">
      Evaluate All
    </button>
  </div>
</template>
