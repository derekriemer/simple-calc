import { describe, it, expect } from 'vitest'
import { Expression, unitExpr } from './Expression'

describe('Expression', () => {
  it('should create an Expression instance', () => {
    const expr = new Expression('2 + 2', true)
    expect(expr.expression).toBe('2 + 2')
    expect(expr.res).toBe('')
  })

  it('should evaluate an expression', () => {
    const expr = new Expression('2 + 2', true)
    const prevExpr = unitExpr()
    expr.evaluate(prevExpr)
    expect(expr.res).toBe('4')
  })

  it('should evaluate an expression with previous result', () => {
    const expr1 = new Expression('2 + 2', true)
    const expr2 = new Expression('_ + 3', true)
    expr1.evaluate(unitExpr())
    expr2.evaluate(expr1)
    expect(expr2.res).toBe('7')
  })

  it('should return a unit expression', () => {
    const expr = unitExpr()
    expect(expr.expression).toBe('0')
    expect(expr.res).toBe('0')
  })
})
