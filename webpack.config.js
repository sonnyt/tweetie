const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      }
    ]
  },

  entry: {
    'dist/tweetie': './src/tweetie',
    'docs/tweetie': './src/tweetie'
  },

  output: {
    path: path.resolve(__dirname),
    filename: '[name].min.js'
  },

  plugins: [
    new UglifyJSPlugin()
  ]
};
