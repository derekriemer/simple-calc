<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'
import { useExpressionsStore } from '@/stores/expressions'
import type { Expression } from '@/models/Expression'

const props = defineProps<{ expression: { expression: Expression; index: number } }>()
const emit = defineEmits<{ (e: 'updateInput', expression: Expression): void }>()
const expressionsStore = useExpressionsStore()

const current = computed<boolean>(() => {
  return expressionsStore.cur === props.expression.index
})

const addToInput = () => {
  emit('updateInput', props.expression.expression)
}

const removeExpression = () => {
  expressionsStore.removeExpression(props.expression.index)
}
</script>

<template>
  <li :class="{ current: current }" :aria-current="current">
    <div class="expression-card" @click="addToInput">
      <button>
        <span>{{ expression.expression }}</span>
      </button>
      <button @click.stop="removeExpression">Remove</button>
      <span>{{ current }}</span>
    </div>
  </li>
</template>

<style scoped>
.expression-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  cursor: pointer;
}

button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #ff1a1a;
}

li.current {
  background-color: #e0f7fa;
  border-left: 4px solid #00796b;
}
</style>
