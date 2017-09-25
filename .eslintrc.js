module.exports = {
  extends: "google",
  parserOptions: {
    sourceType: "module",
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }    
  },
  rules: {
    "guard-for-in": 0,
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