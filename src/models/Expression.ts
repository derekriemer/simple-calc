import { evaluate } from 'mathjs';

export class Expression {
  public expression: string;
  public res: string;

  constructor(expression: string) {
    this.expression = expression;
    this.res = '';
  }

  toString() {
    return this.expression;
  }

  evaluate(prevResult: Expression) {
    this.res = evaluate(this.expression, {
      _: prevResult.res
    })
  }
}

export function unitExpr(): Expression {
  const expr = new Expression('0');
  expr.res = '0'
  return expr;
}
