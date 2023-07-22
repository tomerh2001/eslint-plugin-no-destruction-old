module.exports = {
    meta: {
      type: "problem",
      docs: {
        description: "Disallow destructuring",
        category: "Possible Errors",
        recommended: true,
      },
      schema: [], // no options
    },
  
    create: function (context) {
      return {
        VariableDeclarator(node) {
          if (node.id.type === "ObjectPattern" || node.id.type === "ArrayPattern") {
            context.report({
              node,
              message: "Destructuring is not allowed",
            });
          }
        },
      };
    },
  };
  