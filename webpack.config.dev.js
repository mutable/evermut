const path = require('path');
const defaultConfig = require('./webpack.config.common');

const config = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  ...defaultConfig
};

module.exports = config;