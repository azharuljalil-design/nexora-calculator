type Token =
  | { type: "number"; value: number }
  | { type: "op"; value: "+" | "-" | "*" | "/" | "^" }
  | { type: "lparen" }
  | { type: "rparen" }
  | { type: "ident"; value: string };

const FUNCTIONS = new Set(["sin", "cos", "tan", "sqrt", "log", "ln"]);

function isWhitespace(ch: string) {
  return /\s/.test(ch);
}

function isDigit(ch: string) {
  return /[0-9]/.test(ch);
}

function isAlpha(ch: string) {
  return /[a-zA-Z]/.test(ch);
}

export function tokenizeExpression(expr: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < expr.length) {
    const ch = expr[i]!;
    if (isWhitespace(ch)) {
      i++;
      continue;
    }

    if (ch === "(") {
      tokens.push({ type: "lparen" });
      i++;
      continue;
    }
    if (ch === ")") {
      tokens.push({ type: "rparen" });
      i++;
      continue;
    }
    if (ch === "+" || ch === "-" || ch === "*" || ch === "/" || ch === "^") {
      tokens.push({ type: "op", value: ch });
      i++;
      continue;
    }

    if (isDigit(ch) || ch === ".") {
      let j = i;
      while (j < expr.length && (isDigit(expr[j]!) || expr[j] === ".")) j++;
      const raw = expr.slice(i, j);
      const num = Number(raw);
      if (!Number.isFinite(num)) {
        throw new Error(`Invalid number: ${raw}`);
      }
      tokens.push({ type: "number", value: num });
      i = j;
      continue;
    }

    if (isAlpha(ch)) {
      let j = i;
      while (j < expr.length && (isAlpha(expr[j]!) || isDigit(expr[j]!))) j++;
      const ident = expr.slice(i, j).toLowerCase();
      tokens.push({ type: "ident", value: ident });
      i = j;
      continue;
    }

    throw new Error(`Unexpected character: ${ch}`);
  }

  return tokens;
}

type Assoc = "left" | "right";
type OpInfo = { prec: number; assoc: Assoc };

const OPS: Record<string, OpInfo> = {
  "+": { prec: 1, assoc: "left" },
  "-": { prec: 1, assoc: "left" },
  "*": { prec: 2, assoc: "left" },
  "/": { prec: 2, assoc: "left" },
  "^": { prec: 3, assoc: "right" }
};

type RpnToken =
  | { type: "number"; value: number }
  | { type: "op"; value: "+" | "-" | "*" | "/" | "^" }
  | { type: "func"; value: string }
  | { type: "const"; value: "pi" };

function toRpn(tokens: Token[]): RpnToken[] {
  const output: RpnToken[] = [];
  const stack: Array<Token | { type: "func"; value: string }> = [];

  // Handle unary minus by inserting 0 before leading '-' or '(-'
  const normalized: Token[] = [];
  for (let idx = 0; idx < tokens.length; idx++) {
    const t = tokens[idx]!;
    const prev = normalized[normalized.length - 1];
    const isUnaryMinus =
      t.type === "op" &&
      t.value === "-" &&
      (!prev || prev.type === "op" || prev.type === "lparen");
    if (isUnaryMinus) {
      normalized.push({ type: "number", value: 0 });
      normalized.push(t);
    } else {
      normalized.push(t);
    }
  }

  for (let i = 0; i < normalized.length; i++) {
    const token = normalized[i]!;

    if (token.type === "number") {
      output.push({ type: "number", value: token.value });
      continue;
    }

    if (token.type === "ident") {
      if (token.value === "pi") {
        output.push({ type: "const", value: "pi" });
        continue;
      }
      if (FUNCTIONS.has(token.value)) {
        // Function must be followed by '(' in typical usage, but we tolerate "sin 30" by applying next value.
        stack.push({ type: "func", value: token.value });
        continue;
      }
      throw new Error(`Unknown identifier: ${token.value}`);
    }

    if (token.type === "op") {
      const o1 = token.value;
      const o1i = OPS[o1];
      if (!o1i) throw new Error(`Unknown operator: ${o1}`);
      while (stack.length) {
        const top = stack[stack.length - 1]!;
        if (top.type === "op") {
          const o2 = top.value;
          const o2i = OPS[o2];
          const shouldPop =
            (o1i.assoc === "left" && o1i.prec <= o2i.prec) ||
            (o1i.assoc === "right" && o1i.prec < o2i.prec);
          if (shouldPop) {
            output.push({ type: "op", value: o2 });
            stack.pop();
            continue;
          }
        } else if ((top as any).type === "func") {
          // Functions have higher precedence than operators; apply before operator
          output.push({ type: "func", value: (top as any).value });
          stack.pop();
          continue;
        }
        break;
      }
      stack.push(token);
      continue;
    }

    if (token.type === "lparen") {
      stack.push(token);
      continue;
    }

    if (token.type === "rparen") {
      while (stack.length && stack[stack.length - 1]!.type !== "lparen") {
        const top = stack.pop()!;
        if ((top as any).type === "func") {
          output.push({ type: "func", value: (top as any).value });
        } else if (top.type === "op") {
          output.push({ type: "op", value: top.value });
        }
      }
      if (!stack.length) throw new Error("Mismatched parentheses");
      // pop '('
      stack.pop();
      // if function on top, pop it too
      if (stack.length && (stack[stack.length - 1] as any).type === "func") {
        const fn = stack.pop() as any;
        output.push({ type: "func", value: fn.value });
      }
      continue;
    }
  }

  while (stack.length) {
    const top = stack.pop()!;
    if (top.type === "lparen" || top.type === "rparen") {
      throw new Error("Mismatched parentheses");
    }
    if ((top as any).type === "func") {
      output.push({ type: "func", value: (top as any).value });
    } else if (top.type === "op") {
      output.push({ type: "op", value: top.value });
    }
  }

  return output;
}

function applyFunc(name: string, x: number): number {
  switch (name) {
    case "sin":
      return Math.sin(x);
    case "cos":
      return Math.cos(x);
    case "tan":
      return Math.tan(x);
    case "sqrt":
      return Math.sqrt(x);
    case "log":
      return Math.log10(x);
    case "ln":
      return Math.log(x);
    default:
      throw new Error(`Unknown function: ${name}`);
  }
}

export function evaluateExpression(expr: string): number {
  const tokens = tokenizeExpression(expr);
  const rpn = toRpn(tokens);
  const stack: number[] = [];

  for (const t of rpn) {
    if (t.type === "number") {
      stack.push(t.value);
      continue;
    }
    if (t.type === "const") {
      stack.push(Math.PI);
      continue;
    }
    if (t.type === "func") {
      const x = stack.pop();
      if (x === undefined) throw new Error("Invalid expression");
      stack.push(applyFunc(t.value, x));
      continue;
    }
    if (t.type === "op") {
      const b = stack.pop();
      const a = stack.pop();
      if (a === undefined || b === undefined) throw new Error("Invalid expression");
      switch (t.value) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "/":
          stack.push(a / b);
          break;
        case "^":
          stack.push(Math.pow(a, b));
          break;
      }
    }
  }

  if (stack.length !== 1) throw new Error("Invalid expression");
  const result = stack[0]!;
  if (!Number.isFinite(result)) throw new Error("Result is not finite");
  return result;
}

