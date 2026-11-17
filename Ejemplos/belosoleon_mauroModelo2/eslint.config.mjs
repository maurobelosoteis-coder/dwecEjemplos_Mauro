import js from "@eslint/js";
import globals from "globals";
export default [
js.configs.recommended,
{
languageOptions: {
ecmaVersion: "latest",
sourceType: "script",
globals: { ...globals.browser }
},
rules: {
"no-unused-vars": ["warn", { vars: "local" }],
"eqeqeq": "warn",
"prefer-const": "warn"
}
}
];