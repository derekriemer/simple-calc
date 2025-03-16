import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { Expression, unitExpr } from '../models/Expression'

export const useExpressionsStore = defineStore('expressions', () => {
  const cur = ref(-1  )
  const expressions = reactive<Expression[]>([])

  const previousExpression = ref(unitExpr())

  const expression = computed(() => {
    return expressions[cur.value] ?? unitExpr()
  })

  const addExpression = (expression: string) => {
    expressions.push(new Expression(expression))
    cur.value = expressions.length-1
  }

  const removeExpression = (index: number) => {
    expressions.splice(index, 1)
    if(cur.value >= expressions.length) {
      cur.value = expressions.length - 1
    }
  }

  const updateCur = (index: number) => {
    cur.value = index
  }

  const evaluateExpr = () => {
    try {
      expressions[cur.value].evaluate(previousExpression.value)
      previousExpression.value = expressions[cur.value]
    } catch (e) {
      if (e instanceof Error) {
        expressions[cur.value].res = e.message
      }
    }
  }

  return {
    addExpression,
    cur,
    evaluateExpr,
    expression,
    expressions,
    previousExpression,
    removeExpression,
    updateCur,
  }
})
