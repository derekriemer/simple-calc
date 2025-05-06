<script setup lang="ts">
import { useExpressionsStore } from '@/stores/expressions'
import ExpressionCard from './ExpressionCard.vue'
import { onMounted } from 'vue'
const expressionsStore = useExpressionsStore()
onMounted(() => {
  [
    "1+_",
    "1+_",
    "1+_",
    "1+_",
    "1+_",
    "1+_",
    "1+_",
    "1+_",
    "1+_",
    "1+_",
    "1+_",
    "1+_",
    "1+_",
    "1+_",
    "1+_",
    "1+_",
    "1+_",
    "floor(_*100)",
    "random()",
    "5+5",
  ].forEach((e) => {
    expressionsStore.addExpression(e)
  })
})
</script>

<template>
  <div class="expressions-list">
    <ul>
      <ExpressionCard v-for="(expression, index) in expressionsStore.expressions" :key="index" :expression="expression"
        :index="index" />
    </ul>
  </div>
</template>

<style scoped>
.expressions-list {
  margin: 0 auto;
  padding: 1rem;
}

ul {
  list-style-type: none;
  padding: 0;
}
</style>
