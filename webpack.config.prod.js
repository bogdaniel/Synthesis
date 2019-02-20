import path from 'path';
import webpack from 'webpack';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  mode: 'production',
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index'),
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    // Hash the files using MD5 so that their names change when the content changes.
    new WebpackMd5Hash(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    // Create an options file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyElements: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeRedundantAttributes: true,
        sortClassName: true,
        useShortDoctype: true,
        keepClosingSlash: true,

      },
      inject: true,
    }),
    // Minify JS
    new webpack.optimize.UglifyJsPlugin('[name].[chunkhash].css'),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].map',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
              removeComments: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: MiniCssExtractPlugin.loader({
          allChunks: true,
          fallback: 'style-loader',
          options: 'css-loader',
        }),
      },
      {
        test: /\.scss$/,
        use: MiniCssExtractPlugin.loader({
          fallback: 'style-loader',
          // resolve-url-loader may be chained before sass-loader if necessary
          options: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.less/,
        use: MiniCssExtractPlugin.loader({
          fallback: 'style-loader',
          // resolve-url-loader may be chained before sass-loader if necessary
          options: ['css-loader', 'less-loader'],
        }),
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
};
