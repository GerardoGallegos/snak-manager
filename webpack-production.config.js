const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')

const PLUGINS = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    mangle: false,
    sourcemap: false,
    compress: {
      warnings: false
    }
  })
]

const WEBPACK_PRODUCTION_CONFIG = Object.assign({}, webpackConfig, {
  entry: './src/index',
  plugins: PLUGINS,
  devtool: 'cheap-module-source-map',
})

module.exports = WEBPACK_PRODUCTION_CONFIG
