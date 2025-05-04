import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useExpressionsStore } from './expressions';

describe('expressions store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should initialize with default values', () => {
    const store = useExpressionsStore();
    expect(store.cur).toBe(-1);
    expect(store.expressions).toEqual([]);
  });

  it('should add an expression', () => {
    const store = useExpressionsStore();
    store.addExpression('2 + 2');
    expect(store.expressions.length).toBe(1);
    expect(store.expressions[0].expression).toBe('2 + 2');
    expect(store.cur).toBe(0);
  });

  it('should remove an expression', () => {
    const store = useExpressionsStore();
    store.addExpression('2 + 2');
    store.removeExpression(0);
    expect(store.expressions.length).toBe(0);
    expect(store.cur).toBe(-1);
  });

  it('should mark an expression as dirty', () => {
    const store = useExpressionsStore();
    store.addExpression('2 + 2');
    store.markDirty(0);
    expect(store.dirty).toBe(0);
  });

  it('should evaluate an expression', () => {
    const store = useExpressionsStore();
    store.addExpression('2 + 2');
    store.markDirty(0);
    store.evaluateExpr();
    expect(store.expressions[0].res).toBe('4');
  });

  it('should handle evaluation errors', () => {
    const store = useExpressionsStore();
    store.addExpression('2 / 0');
    store.markDirty(0);
    store.evaluateExpr();
    expect(store.expressions[0].res).toBe('Infinity');
  });

  it('should chain evaluations', () => {
    const store = useExpressionsStore();
    store.addExpression('2 + 2');
    store.addExpression('_ + 3');
    store.markDirty(1);
    store.evaluateExpr();
    expect(store.expressions[0].res).toBe('7');
    expect(store.expressions[1].res).toBe('4');
  });
});
