const variables = {};

function binaryOperations(lhs, op, rhs) {
  switch (op) {
    case 'Add':
      return lhs + rhs;
    case 'Sub':
      return lhs - rhs;
    case 'Mul':
      return lhs * rhs;
    case 'Div':
      return lhs / rhs;
    case 'Rem':
      return lhs % rhs;
    case 'Eq':
      return lhs === rhs;
    case 'Neq':
      return lhs !== rhs;
    case 'Lt':
      return lhs < rhs;
    case 'Lte':
      return lhs <= rhs;
    case 'Gt':
      return lhs > rhs;
    case 'Gte':
      return lhs >= rhs;
    case 'And':
      return lhs && rhs;
    case 'Or':
      return lhs || rhs;
  }
}

export function transpiler(expression) {
  if (!expression) {
    return
  }
  switch (expression.kind) {
    // TIPOS
    case 'Str':
      return expression.value;
    case 'Int':
      return expression.value;

    case "Print":
      return console.log(transpiler(expression.value));
    case 'Let':
      variables[expression.name.text] = transpiler(expression.value);
      return transpiler(expression.next);
    case 'Var':
      return variables[expression.text];
    case 'Function':
      return expression;
    case 'Call':
      return execFunc(variables[expression.callee.text], expression.arguments);
    case 'If':
      if (transpiler(expression.condition)) return transpiler(expression.then);
      else return transpiler(expression.otherwise);
    case 'Binary':
      return binaryOperations(transpiler(expression.lhs), expression.op, transpiler(expression.rhs));
  }
}

function execFunc(func, args) {  
  for (let i = 0; i < func.parameters.length; i++) {
    variables[func.parameters[i].text] = transpiler(args[i]);
  }

  return transpiler(func.value);
}