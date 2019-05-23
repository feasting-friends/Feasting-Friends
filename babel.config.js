module.exports = function (api) {
  api.cache(true);

  const presets = [
    [ "@babel/env", {"modules": false} ],
        "@babel/preset-react"
  ];
  const plugins = [
    "syntax-dynamic-import",
      "@babel/plugin-transform-runtime",
      "transform-async-to-generator"
  ];

  return {
    presets,
    plugins
  };
}
