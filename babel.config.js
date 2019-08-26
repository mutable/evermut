const presets = [
  "@babel/react",
  [
    "@babel/env",
    {
      "useBuiltIns": "usage",
      "corejs": "3.0.0",
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
    },
  ],
];

const plugins = [
  "@babel/plugin-transform-arrow-functions",
  [
    "@babel/plugin-proposal-export-namespace-from"
  ],
  [
    '@babel/plugin-proposal-decorators',
    {
      legacy: true
    }
  ],
  [
    '@babel/plugin-proposal-class-properties',
    {
      loose: true
    }
  ]
];

module.exports = { presets, plugins };