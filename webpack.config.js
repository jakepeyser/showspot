/* eslint-disable no-unused-vars, no-fallthrough*/
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

// Init common paths used by config
const path = require('path');
const PATHS = {
  app: path.join(__dirname, 'browser/app'),
  build: path.join(__dirname, 'browser/build'),
  favicon: path.join(__dirname, 'browser/src', 'favicon.ico'),
  stylesheets: path.join(__dirname, 'browser/src/stylesheets', 'style.scss'),
  html_template: path.join(__dirname, 'browser/src/index.html')
};

// Vendor dependencies, isolated for chunking
const vendorDependencies = [
  'axios',
  'react', 'react-dom', 'react-helmet', 'react-router',
  'redux', 'react-redux', 'redux-logger', 'redux-thunk'
];

// Standard build artifacts for all envs
const common = {
  entry: {
    app: PATHS.app,
    style: PATHS.stylesheets
  },
  output: {
    path: PATHS.build,
    sourceMapFilename: '[file].map',
    filename: '[name].js'
  },
  plugins: [
    new ExtractTextPlugin('[name].[chunkhash].css'),
    new HtmlWebpackPlugin({
      favicon: PATHS.favicon,
      template: PATHS.html_template
    })
  ],
  module: {
    loaders: [
      { // Convert React code into vanilla ES5
        test: /jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      { // Transpile SASS and load CSS
        test: /\.scss$/,
        loader: process.env.NODE_ENV !== 'production' ?
          'style!css!sass' : ExtractTextPlugin.extract('style', 'css!sass'),
        include: PATHS.stylesheets
      },
      { // Inline SVGs where required in components
        test: /\.svg$/,
        loader: 'babel!svg-react'
      }
    ]
  }
}

// Detect how npm is run and switch based on this
let config;
switch (process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(
      common,
      {
        devtool: 'source-map',
        entry: { vendor: vendorDependencies },
        output: Object.assign(common.output, {
          filename: '[name].[chunkhash].js',
          chunkFilename: '[chunkhash].js'
        }),
        plugins: [
          ...common.plugins,
          new CleanWebpackPlugin( // remove old build before each bundling
            [ PATHS.build ],
            { root: process.cwd() }
          ),
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
          }),
          new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
          }),
          new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
          })
        ]
      }
    );
    break;
  case 'hmr': // Establish a HMR dev server
    config = merge(
      common,
      {
        devServer: {
          proxy: {
            '/api': {
              target: 'http://localhost:8080',
              secure: false
            }
          },
          historyApiFallback: true,
          hot: true,
          inline: true,
          stats: 'errors-only',
          port: 3000
        },
        devtool: 'eval-source-map',
        plugins: [
          ...common.plugins,
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
          }),
          new webpack.HotModuleReplacementPlugin({
            multiStep: true
          })
        ]
      }
    );
    break;
  case 'build-dev':
  case 'build-watch':
    config = merge(
      common,
      {
        devtool: 'eval-source-map',
        plugins: [
          ...common.plugins,
          new CleanWebpackPlugin( // remove old build before each bundling
            [ PATHS.build ],
            { root: process.cwd() }
          ),
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
          })
        ]
      }
    );
    break;
  default:
    console.log('No Webpack config specified')
    config = merge(common)
}

module.exports = validate(config, { quiet: true });
