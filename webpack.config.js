const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

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
    path: './',
    filename: '[name].min.js'
  },

  plugins: [
    new UglifyJSPlugin()
  ]
};
