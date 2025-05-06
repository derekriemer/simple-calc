<script setup lang="ts">
import { defineProps, ref, computed, watch, onBeforeUnmount } from 'vue'
import { useExpressionsStore } from '@/stores/expressions'
import type { Expression } from '@/models/Expression'

const { expression, index } = defineProps<{ expression: Expression, index: number, }>()
const expressionsStore = useExpressionsStore()
const inputRef = ref<HTMLInputElement | null>(null)


const current = computed<boolean>(() => {
  return expressionsStore.cur === index
})

// we need to watch for changes to the input ref, because if it becomes null, we don't want to keep tracking.
// we also need to track current. If current ever becomes true for us, we need to respond to updates from the store.
// Also, immediate=true, because if we are added to the beginning of expressions array on a new mount, we need to watch the effect if we are current.
watch(current, (isCurrent, wasCurrent) => {
  if (isCurrent && !wasCurrent) {
    console.trace("Updating current to new resolver")
    expressionsStore.registerPendingCommitResponder(update)
  }
}, { immediate: true, })

const removeExpression = () => {
  expressionsStore.removeExpression(index)
}

function update() {
  console.trace("updating!")
  const newVal = inputRef.value?.value
  if (newVal) {
    expressionsStore.update(index, newVal)
  }
}

onBeforeUnmount(() => {
  update()
})

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
