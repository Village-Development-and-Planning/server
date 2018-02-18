module.exports = {
  extends: "google",
  parser: "babel-eslint",  
  parserOptions: {
    sourceType: "module",
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }    
  },
  rules: {
    "one-var": 0,
    "guard-for-in": 0,
    "require-jsdoc": [
      "warn", 
      {
        "require": {
          "FunctionDeclaration": true,
          "MethodDefinition": false,
          "ClassDeclaration": false,
          "ArrowFunctionExpression": false
        }
      }
    ],
    "no-invalid-this": 0,
  }
};