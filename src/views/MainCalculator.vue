<script setup lang="ts">
import ExpressionsList from '../components/ExpressionsList.vue'
import ToolBar from '@/components/ToolBar.vue'
import { useTemplateRef } from 'vue'


const toolbarRef = useTemplateRef("toolbar")

function add(event: KeyboardEvent) {
  if (event.key !== '+') {
    return
  }
  event.preventDefault()
  toolbarRef.value?.add()
}

const evaluate = () => {
  toolbarRef.value?.evaluate()
}
</script>

<template>
  <main @keyup.ctrl="add" @keyup.ctrl.enter.prevent="evaluate">
    <ExpressionsList @eval="evaluate" />
    <ToolBar ref="toolbar" />
  </main>
</template>

<style scoped>
main {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  gap: 1rem;
  grid-template-areas:
    'expressions'
    'toolbar';
  height: 100%;
  min-height: 0;
}

.expressions-list {
  grid-area: expressions;
  overflow-y: auto;
  width: 100%;
  min-height: 0;
}

.toolbar {
  grid-area: toolbar;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  background: white;
  position: sticky;
  bottom: 0;
  z-index: 2;
}
</style>
