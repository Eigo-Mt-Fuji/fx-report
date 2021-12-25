module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "overrides": [
        {
          "files": ["*.ts", "*.tsx"],
          "rules": {
            "quotes": ["error", "single"]
          }
        }
    ],
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/no-explicit-any": 0,
        '@typescript-eslint/no-var-requires': 0
    },
    "settings": {
        "react": {
          "createClass": "createReactClass",
          "pragma": "React",
          "fragment": "Fragment",
          "version": "detect",
          "flowVersion": "0.53"
        }
    }
};
