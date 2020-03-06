module.exports = {
  extends: "stylelint-config-wordpress/scss",
  rules: {
    "no-empty-source": null,
    "string-quotes": "double",
    "scss/at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "extend",
          "at-root",
          "debug",
          "warn",
          "error",
          "if",
          "else",
          "for",
          "each",
          "while",
          "mixin",
          "include",
          "content",
          "return",
          "function",
          "tailwind",
          "apply",
          "responsive",
          "variants",
          "screen"
        ]
      }
    ]
  }
};
