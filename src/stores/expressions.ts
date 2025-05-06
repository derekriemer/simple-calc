import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { Expression, unitExpr } from '../models/Expression'

export const useExpressionsStore = defineStore('expressions', () => {
  // Store state
  const cur = ref(0)
  let dirty = 0 // Index of first dirty expression
  const expressions: Expression[] = reactive([unitExpr()])
  let updateNow: (() => void) | null = null

  /**
   * Registers a callback telling the current component to update its changes.
   * @param cb callback to register
   */
  function registerPendingCommitResponder(cb: () => void): void {
    updateNow = cb
  }

  /**
   * Removes the pending commit responder
   */
  function removePendingCommitResponder() {
    updateNow = null
  }

  /**
   * Adds a new expression to the beginning of the list
   * @param expression String expression to add
   */
  const addExpression = (expression: string) => {
    if (expressions[0].dirty) {
      dirty++
    }
    expressions.unshift(new Expression(expression, true))
    cur.value = 0
  }

  /**
   * Adds an empty expression to the beginning of the list
   */
  const addEmptyExpression = () => {
    addExpression('')
  }

  /**
   * Removes an expression at the specified index
   * @param index Index of expression to remove
   */
  const removeExpression = (index: number) => {
    expressions.splice(index, 1)
    if (cur.value >= index) {
      cur.value = cur.value - 1
    }
    if (dirty >= index) {
      dirty -= 1
    }
  }

  /**
   * Sets the current expression for editing
   * @param index Index of expression to edit
   */
  const edit = (index: number) => {
    if (expressions.length <= index) {
      return
    }
    cur.value = index
  }

  /**
   * Marks an expression and all dependent expressions as dirty
   * @param index Index of expression to mark dirty
   */
  const markDirty = (index: number) => {
    if (index < dirty || index >= expressions.length) {
      return
    }
    for (let tempDirty = dirty; tempDirty <= index; tempDirty++) {
      expressions[tempDirty].dirty = true
      expressions[tempDirty].res = ''
    }
    dirty = index
  }

  /**
   * Evaluates all dirty expressions in sequence
   * If an expression fails, all dependent expressions are marked as failed
   */
  const evaluateExpressions = async (): Promise<boolean> => {
    console.log('Evaluating: updating: ', updateNow)
    updateNow?.()
    console.log('updated')
    let failed = false
    let firstFailed = 0
    for (let tempDirty = dirty; tempDirty >= 0; tempDirty--) {
      if (failed) {
        expressions[tempDirty].res = 'dependent expression, must fix all prior expressions first...'
        continue
      }
      try {
        expressions[tempDirty].evaluate(
          tempDirty < expressions.length - 1 ? expressions[tempDirty + 1] : unitExpr(),
        )
        expressions[tempDirty].dirty = false
      } catch (e) {
        if (e instanceof Error) {
          console.log('failed exppr eval: ', e)
          expressions[tempDirty].res = e.message
          failed = true
          if (firstFailed == -1) {
            firstFailed = tempDirty
          }
        }
      }
    }
    dirty = failed ? 0 : firstFailed
    return !failed
  }

  /**
   * Updates an expression at the specified index with a new value
   * @param index Index of expression to update
   * @param value New expression value
   */
  const update = (index: number, value: string) => {
    if (index < expressions.length) {
      markDirty(index)
      expressions[index].expression = value
    }
  }

  return {
    addEmptyExpression,
    addExpression,
    cur,
    edit,
    evaluateExpressions,
    expressions,
    markDirty,
    registerPendingCommitResponder,
    removePendingCommitResponder,
    getDirtyTemp: dirty,
    removeExpression,
    update,
  }
})
