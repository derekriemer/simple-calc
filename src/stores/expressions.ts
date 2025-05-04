import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Expression, unitExpr } from '../models/Expression'

export const useExpressionsStore = defineStore('expressions', () => {
  const cur = ref(-1  )

  let dirty = 0

  const expressions: Expression[] = []

  const addExpression = (expression: string) => {
    expressions.unshift(new Expression(expression))
    cur.value = 0
  }

  const removeExpression = (index: number) => {
    expressions.splice(index, 1)
    // move the cursor back if we remove an expression occuring after or remove the cursor, as it now points to the wrong place.
    if(cur.value >= index) {
      cur.value = cur.value-1
    }
    if (dirty >= index) {
      dirty -= 1
    }
  }

  const markDirty = (index: number) => {
    if (index > dirty && index >= 0 && index < expressions.length) {
      dirty = index
    }
  }

  const evaluateExpr = () => {
    let failed = false
    while(dirty > -1) {
      if(failed) {
        expressions[dirty].res = 'dependent expression might have an error'
        dirty -= 1
        continue
      }
      try {
        expressions[dirty].evaluate(dirty > 0 ? expressions[dirty-1] : unitExpr())
      } catch (e) {
        if (e instanceof Error) {
          expressions[dirty.value].res = e.message
          failed = true
        }
      }
      dirty -= 1
    }
  }

  return {
    addExpression,
    evaluateExpr,
    expressions,
    markDirty,
    removeExpression,
  }
})
