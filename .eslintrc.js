module.exports = {
  extends: "google",
  parserOptions: {
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }    
  },
  rules: {
    "require-jsdoc": [
      "warn", 
      {
        "require": {
          "FunctionDeclaration": true,
          "MethodDefinition": false,
          "ClassDeclaration": true,
          "ArrowFunctionExpression": false
        }
      }]
  }
};