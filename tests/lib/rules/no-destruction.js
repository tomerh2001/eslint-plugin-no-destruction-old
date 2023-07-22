const rule = require("../../../lib/rules/no-destruction");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2020, // ES6 syntax
        sourceType: "module", // Allows the use of imports
    },
});

ruleTester.run("no-destruction", rule, {
  valid: [
    "const a = obj.a;",
    "const b = arr[0];",
    "let c;",
    "var d = 1;",
  ],

  invalid: [
    {
      code: "const { a } = obj;",
      errors: [{ message: "Destructuring is not allowed", type: "VariableDeclarator" }],
    },
    {
      code: "const [b] = arr;",
      errors: [{ message: "Destructuring is not allowed", type: "VariableDeclarator" }],
    },
  ],
});
