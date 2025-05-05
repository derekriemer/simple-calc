<script setup lang="ts">
import { defineProps, ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useExpressionsStore } from '@/stores/expressions'
import type { Expression } from '@/models/Expression'
const { expression, index } = defineProps<{ expression: Expression, index: number, }>()
const expressionsStore = useExpressionsStore()
const { updateNow } = storeToRefs(expressionsStore)

let pendingResolve: (() => void) | null = null

const inputRef = ref<HTMLInputElement | null>(null)
watch(updateNow, (val) => {
  if (!val) return
  if (!current.value) {
    return
  }
  const newVal = inputRef.value?.value
  if (newVal) {
    expressionsStore.update(index, newVal)
  }
  if (pendingResolve) {
    pendingResolve()
    pendingResolve = null
  }
})

const current = computed<boolean>(() => {
  return expressionsStore.cur === index
})
watch(current, (isCurrent, wasCurrent) => {
  if (isCurrent && !wasCurrent) {
    expressionsStore.registerPendingCommitResponder(new Promise<void>((resolve) => {
      pendingResolve = resolve;
    }));
  } else {
    expressionsStore.removePendingCommitResponder()
    pendingResolve = null
  }
})

const removeExpression = () => {
  expressionsStore.removeExpression(index)
}

function update(event: Event) {
  expressionsStore.update(index, (event.target as HTMLInputElement).value)
}
</script>

<template>
  <li :class="{ current: current }" :aria-current="current">
    <div class="expression-card" :class="{
      dirty: expression.dirty,
      current: current,
    }">
      <input v-show="current" ref="inputRef" type="text" :value="expression" @blur="update"
        placeholder="Enter expression" />
      <button v-show="!current" @click="expressionsStore.edit(index)" class="expression">
        {{ expression }}
      </button>
      <span class="equals">=</span>
      <span class="result">{{ expression.res }}</span>
      <button class="remove" @click.stop="removeExpression">Remove</button>
    </div>
  </li>
</template>

<style scoped>
.expression-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease;
}

.expression-card.dirty {
  border-color: #ffa726;
  background-color: #fff3e0;
}

/* Expression button styling */
.expression-card .expression {
  background-color: transparent;
  color: #333;
  border: 1px solid #e0e0e0;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.expression-card .expression:hover {
  background-color: #f5f5f5;
  border-color: #bdbdbd;
}

/* Equals sign styling */
.expression-card .equals {
  font-weight: bold;
  color: #666;
  margin: 0 0.5rem;
}

/* Result styling */
.expression-card .result {
  color: #2196f3;
  font-family: monospace;
  font-size: 1.1em;
}

/* Remove button styling */
.expression-card .remove {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  margin-left: auto;
}

.expression-card .remove:hover {
  background-color: #ff1a1a;
}

/* Input field styling */
.expression-card input {
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1em;
}

li.current {
  background-color: #e0f7fa;
  border-left: 4px solid #00796b;
}
</style>
