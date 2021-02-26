const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const Dotenv = require('dotenv-webpack');

module.exports = () => {
    return {
      entry: {
        popup: './src/popup/index.tsx',
        option: './src/option/index.tsx',
        // background: './src/background/RuntimeMessageListener.ts'
      },
      output: {
        path: path.resolve(__dirname, 'dist')
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader',
        },
        {
          test: /\.css/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: { url: false }
            }
          ]
        }
        ],
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.min.js', '.js', '.jsx'],
        modules: [
          path.resolve(__dirname, 'src', 'option'), 
          path.resolve(__dirname, 'src', 'popup'), 
          path.resolve(__dirname, 'src', 'shared'), 
          'node_modules'
        ]
      },
      plugins: [
        new CopyWebpackPlugin({
          patterns: [
            {
              from: './public/manifest.json',
              to: path.join(__dirname, 'dist', 'manifest.json')
            }
         ]
        }),
        new HtmlWebpackPlugin({
          template: './public/popup.html',
          filename: './popup.html',
          chunks: ['popup'],
        }),
        new HtmlWebpackPlugin({
          template: './public/option.html',
          filename: './option.html',
          chunks: ['option'],
        }),
        // new CleanWebpackPlugin()
      ],
      devServer: {
        inline: true,
        contentBase: path.join(__dirname, 'public'),
        watchContentBase: true
      }
    }
}