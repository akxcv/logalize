var { resolve } = require('path')

export default {
  entry: './src/app.js',
  output: {
    filename: 'logalize.js',
    path: resolve('dist')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: ['css-loader'],
        exclude: /node_modules/
      }
    ]
  }
}
