import { evaluate } from 'mathjs'

export class Expression {
  public expression: string
  public res: string

  constructor(
    expression: string,
    public dirty: boolean,
  ) {
    this.expression = expression
    this.res = ''
  }

  toString() {
    return this.expression
  }

  evaluate(prevResult: Expression) {
    // assert(!prevResult.dirty, "Evaluating an expression with a dirty previous expression must fail.")
    // ugly but mathjs mostly returns any. It can return int but often returns str. I'm gonna cast to string here and this could be a problem
    this.res =
      '' +
      evaluate(this.expression, {
        _: prevResult.res,
      })
  }
}

export function unitExpr(): Expression {
  const expr = new Expression('0', false)
  expr.res = '0'
  return expr
}
