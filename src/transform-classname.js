module.exports = function (babel) {
  const { types: t } = babel;

  return {
    visitor: {
      JSXAttribute(path) {
        if (path.node.name.name === 'className') {
          if (path.node.value.type === 'StringLiteral') {
            // Check if the class name contains a hyphen
            if (path.node.value.value.includes('-')) {
              // Replace className="example" with className={styles["example"]}
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
            // Check if the dynamic class name contains a hyphen
            if (path.node.value.expression.value.includes('-')) {
              // Replace className={dynamicClassName} with className={styles[dynamicClassName]}
              path.node.value.expression = t.memberExpression(
                t.identifier('styles'),
                path.node.value.expression,
                true
              );
            }
          }
        }
      },
      ImportDeclaration(path) {
        const sourceValue = path.node.source.value;
        if (sourceValue && sourceValue.endsWith('.css')) {
          // Update the import statement for CSS files
          path.node.source.value = sourceValue.replace(/\.css$/, '.module.css');
        }
      },
    },
  };
};
