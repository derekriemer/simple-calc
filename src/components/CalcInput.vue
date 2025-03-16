<script setup lang="ts">
import { defineProps, InputHTMLAttributes, ref } from 'vue'
import { useExpressionsStore } from '@/stores/expressions'

const props = defineProps({
  value: String,
})

const inputRef = ref<HTMLInputElement | null>(null)

const expressionsStore = useExpressionsStore()

function addAndEvaluate() {
  const inputValue = inputRef.value?.value
  if (!inputValue) return
  expressionsStore.addExpression(inputValue)
  expressionsStore.evaluateExpr()
}
</script>

<template>
  <div>
    <input
      ref="inputRef"
      @keypress.enter="addAndEvaluate()"
      :value="props.value"
      type="text"
      placeholder="Enter expression"
    />
    <button @click="addAndEvaluate()">Evaluate</button>
  </div>
</template>
