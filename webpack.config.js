/**
 * Emailman
 * 
 * https://github.com/orhanaytekin/emailman
 */

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const GasPlugin = require('gas-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'code.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    libraryTarget: 'var',
    library: 'AppLib'
  },
  resolve: {
    extensions: ['.js']
  },
  optimization: {
    minimize: false,
    moduleIds: 'named'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  node: '12'
                }
              }]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new ESLintPlugin({
      fix: true,
      failOnError: false
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'appsscript.json' }]
    }),
    new GasPlugin()
  ]
};
