const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    libraryTarget: 'commonjs2',
    filename: 'evermut.js',
    chunkFilename: '[name].[chunkhash:8].evermut.js',
  },
  performance: {
    maxEntrypointSize: 256000,
    maxAssetSize: 256000
  },
  devtool: 'source-map',
  resolve: {
    // symlinks: false
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            options: {
              compact: true,
            }
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'img/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.svg$/,
            loader: 'svg-inline-loader'
          },
          {
            test: /\.css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader
              },
              'css-loader'
            ]
          },
          {
            loader: 'file-loader',
            // Exclude `js` files to keep "css" loader working as it injects
            // it's runtime that would otherwise processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            options: {
              name: 'assets/[name].[hash:8].[ext]',
            },
          },
          // Make sure to add the new loader(s) before the "file" loader.
        ]
      },
    ]
  },
  optimization: {
    nodeEnv: 'production',
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
            // drop_console: true,
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
  externals: {
    'react': 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
  }
};
