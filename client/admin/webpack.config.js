'use strict';

let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV || 'development';

let config = {

};

config.context = path.resolve(__dirname, 'app');

config.entry = {
  app: './app.js'
};

config.output = {
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/',
  filename: '[name].bundle.js'
};

if('development' === NODE_ENV) {
  config.devtool = 'eval';
  config.watch = true;
}

if('production' === NODE_ENV) {
  config.devtool = 'cheap-module-source-map';
}

config.module = {
  loaders: [
    {
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'stage-0']
      }
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
    },
    {
      test: /\.(png|jpe?g|svg|eot|ttf|woff|woff2)$/,
      loader: 'url-loader'
    },
    {
      test: /\.html$/,
      loader: 'raw'
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    }
  ]
};

config.plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'app/index.html'),
    inject: 'body'
  }),
  new ExtractTextPlugin('bundle.css')
];

if('production' === NODE_ENV) {

  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }));

  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: true
  }));
}

module.exports = config;