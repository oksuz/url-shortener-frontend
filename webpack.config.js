const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'public/index_bundle.js',
    publicPath: '/',
    chunkFilename: 'public/[name].chunk.js'
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 500,
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.json$/,
        type: 'javascript/auto',
        use: 'json-loader'
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9010,
    open: true,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html'
    }),
    new webpack.EnvironmentPlugin({
      API_URL: process.env.API_URL
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: false,
        default: false,
        vendor: {
          chunks: 'all',
          test: /node_modules/,
          name: 'vendor',
          reuseExistingChunk: true
        }
      }
    }
  }
};
