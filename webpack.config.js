const webpack = require('webpack')
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    application: './app/index.jsx'
  },

  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'public')
  },

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',

        options: {
          presets: ['es2015', 'react'],
          plugins: ['transform-object-rest-spread']
        }
      },
      {
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
            'less-loader'
          ],
          fallback: 'style-loader'
        })
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new UglifyJSPlugin(),
    new ExtractTextPlugin('stylesheet.css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'application',
      filename: 'application.min.js'
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}
