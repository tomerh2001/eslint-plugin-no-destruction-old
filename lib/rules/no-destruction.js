module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow destructuring that does not meet certain conditions",
      category: "Possible Errors",
      recommended: true,
    },
    schema: [
      {
        type: "object",
        properties: {
          maximumDestructuredVariables: {
            type: "integer",
            minimum: 0,
          },
          maximumLineLength: {
            type: "integer",
            minimum: 0,
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create: function (context) {
    const maximumDestructuredVariables = context.options[0]?.maximumDestructuredVariables || 2;
    const maximumLineLength = context.options[0]?.maximumLineLength || 80;
    return {
      VariableDeclarator(node) {
        const sourceCode = context.getSourceCode();
        const line = sourceCode.lines[node.loc.start.line - 1];
        const lineLength = line.length;
        const tabCount = line.search(/\S|$/); // Count leading tabs or spaces
        if (node.id.type === "ObjectPattern" || node.id.type === "ArrayPattern") {
          if (tabCount > 1) {
            context.report({
              node,
              message: `Destruction at a nesting level above 1 is not allowed`,
            });
          }
          else if (node.id.properties.length > maximumDestructuredVariables) {
            context.report({
              node,
              message: `Destruction of more than ${maximumDestructuredVariables} variables is not allowed`,
            });
          }
          if (lineLength > maximumLineLength) {
            context.report({
              node,
              message: `Destruction on a line exceeding ${maximumLineLength} characters is not allowed`,
            });
          }
        }
      },
    };
  },
};
