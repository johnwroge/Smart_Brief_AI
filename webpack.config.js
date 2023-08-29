const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  devtool: 'cheap-module-source-map',
  entry: './content.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          {
            loader: 'imports-loader',
            options: {
              additionalCode: 'var require = require("imports-loader?this=>window!require");',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './manifest.json', to: 'manifest.json' },
        { from: './glasses.png', to: 'glasses.png' },
        { from: './background.js', to: 'background.js' },
      ],
    }),
    new HtmlPlugin({
      title: 'SmartBrief Chrome Extension Popup',
      filename: 'popup.html',
      template: './popup/popup.html',
      chunks: ['popup'],
    }),
  ],
  optimization: {
    usedExports: true,
  },
  resolve: {
    fallback: {
      path: false,
      os: false,
      crypto: false,
    },
  },
};
