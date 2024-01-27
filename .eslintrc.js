module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: [
        "react",
        "prettier",
        "react-hooks",
        "@typescript-eslint",
    ],
    rules: {
        "@typescript-eslint/no-unused-vars": ["error"],
        "react/no-unknown-property": ["error", { ignore: ["css"] }],
        "linebreak-style": "off",
        "react/jsx-indent": [2, 4],
        "react/jsx-filename-extension": [
            2,
            { extensions: [".js", ".jsx", ".tsx"] },
        ],
        "import/no-unresolved": "off",
        "import/prefer-default-export": "off",
        "no-unused-vars": "warn",
        "react/require-default-props": "off",
        "react/react-in-jsx-scope": "off",
        "arrow-body-style": "off",
        "prefer-arrow-callback": "off",
        "prettier/prettier": [
            "error",
            {
                endOfLine: "auto",
                printWidth: 80,
                trailingComma: "es5",
                semi: true,
                doubleQuote: true,
                jsxSingleQuote: true,
                singleQuote: false,
                useTabs: false,
                tabWidth: 4,
            },
        ],
        "no-shadow": "off",
        "react/prop-types": "off",
        "@typescript-eslint/strict-boolean-expressions": 0,
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "error",
        "@typescript-eslint/explicit-function-return-type": "off",
    },
};