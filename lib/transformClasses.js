module.exports = function ({ types: t }) {
    return {
      visitor: {
        JSXAttribute(path) {
          if (path.node.name.name === 'className') {
            if (path.node.value.type === 'StringLiteral') {
              if (path.node.value.value.includes('-')) {
                path.node.value = t.jsxExpressionContainer(
                  t.memberExpression(
                    t.identifier('styles'),
                    t.stringLiteral(path.node.value.value),
                    true
                  )
                );
              }
            } else if (
              path.node.value.type === 'JSXExpressionContainer' &&
              path.node.value.expression.type === 'StringLiteral'
            ) {
              if (path.node.value.expression.value.includes('-')) {
                path.node.value.expression = t.memberExpression(
                  t.identifier('styles'),
                  path.node.value.expression,
                  true
                );
              }
            }
          }
        },
      },
    };
  };
  