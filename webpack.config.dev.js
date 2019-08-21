const path = require('path');
const defaultConfig = require('./webpack.config.common');

const config = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  ...defaultConfig
};

module.exports = config;