const webpack = require('webpack')
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-source-map',

  entry: {
    application: './app/index.jsx'
  },

  mode: 'production',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-proposal-class-properties']
        }
      },
      {
        test: /\.(less|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?modules',
          'less-loader'
        ]
      }
    ]
  },

  optimization: {
    minimizer: [new UglifyJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },

  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'public')
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new MiniCssExtractPlugin({ filename: 'stylesheet.css' }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],

  stats: 'errors-only'
}
