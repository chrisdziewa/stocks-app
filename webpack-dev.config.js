var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

module.exports = {
  devtool: 'eval',

  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './public/src/index.js'
  ],

  output: {
    path: path.resolve('./public'),
    filename: "bundle.js",
    publicPath: '/'
  },


  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        cacheDirectory: true
      },
      {
        test: /\.scss$/,
        include: path.join(__dirname, 'public', 'styles'),
        exclude: ['node_modules', 'app'],
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      },
      {
        test   :  /\.json$/,
        loader : 'json'
      },
      {
        test   :  /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader : 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("./styles/main.css"),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss']
  }
};
