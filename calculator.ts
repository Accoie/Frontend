function calc(expression: string): number {
    const tokens = expression.match(/([+\-*/()]|\d+|\S)/g); // \S - пробел, \d - цифра
    if (!tokens) {
        throw new Error("Invalid expression");
    }
    return evaluate(tokens);

    function evaluate(tokens: string[]): number {
        const token = tokens.shift();
        if (!token) {
            throw new Error("Unexpected end of expression");
        }

        if (isOperator(token)) {
            const left = evaluate(tokens);
            const right = evaluate(tokens);
            return applyOperator(token, left, right);
        } else if (isNumber(token)) {
            return parseFloat(token);
        } else if (token === "(") {
            const result = evaluate(tokens);
            if (tokens.shift() !== ")") {
                throw new Error("Mismatched parentheses");
            }
            return result;
        } else {
            throw new Error(`Unexpected token: ${token}`);
        }
    }

    function isOperator(token: string): boolean {
        return ["+", "-", "*", "/"].indexOf(token) !== -1;
    }

    function isNumber(token: string): boolean {
        return !isNaN(parseFloat(token));
    }

    function applyOperator(operator: string, left: number, right: number): number {
        switch (operator) {
            case "+":
                return left + right;
            case "-":
                return left - right;
            case "*":
                return left * right;
            case "/":
                if (right === 0) {
                    throw new Error("Некорректное выражение")
                } else {
                    return left / right;
                }
            default:
                throw new Error(`Unknown operator: ${operator}`);
        }
    }
}

console.log(calc("* 6 - 3 4")) // -6
console.log(calc("(- (+ (* 3 2) 5) (+ 10 4))")) // -3
console.log(calc("(- (+ 8 (/ 16 2)) (* 5 3))")) // -2
console.log(calc("/ 10 0")) // ошибка 
