const development = process.env.NODE_ENV !== 'production'
const path = require('path')
const webpack = require('webpack')


const PLUGINS = (()=>{
  if(development) {
    console.log('MODE::::   DEVELOPMENT')
    return [
      new webpack.HotModuleReplacementPlugin()
    ]
  } else {
    console.log('MODE::::   PRODUCTION')
    return [
      new webpack.optimize.UglifyJsPlugin({
        mangle: false,
        sourcemap: false,
        compress: {
          warnings: false
        }
      })
    ]
  }
}())



const WEBPACKCONFIG = {

  devtool: development ? 'eval' : null,
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000',   //  WebpackDevServer host and port
    'webpack/hot/only-dev-server',                     // 'only' prevents reload on syntax errors
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [{
      test: /(\.jsx|\.js)$/,
      loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015'],
      include: path.join(__dirname, 'src'),
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      loader: 'style!css!sass-loader?sourceMap'
    }]
  },
  plugins: PLUGINS
}



module.exports = WEBPACKCONFIG
