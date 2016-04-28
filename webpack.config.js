/* eslint-env node */
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './safe-object-proxy.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'safe-object-proxy.js',
    libraryTarget: 'umd'
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  }
};
