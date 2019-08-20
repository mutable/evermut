const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');

const defaultConfig = require('./webpack.config.common');

const config = {
  mode: 'production',
  performance: {
    maxEntrypointSize: 256000,
    maxAssetSize: 256000
  },
  devtool: 'source-map',
  resolve: {
    symlinks: false
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: true,
        terserOptions: {
          ecma: 6,
          mangle: true,
          output: {
            comments: false,
            ascii_only: true,
          },
          compress: {
            drop_console: true
          },
        }
      })
    ]
  },
  plugins: [
    new CompressionPlugin(),
    new CleanWebpackPlugin(),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    })
  ],
  ...defaultConfig
};

module.exports = config;