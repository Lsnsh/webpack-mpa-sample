const path = require("path");
const webpack = require("webpack");
const utils = require("./utils");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const entry = {
  vendor: ["lodash"],
  app: "./src/main.js"
};

module.exports = {
  mode: "production",
  entry: utils.generateEntry(entry),
  devtool: "#source-map",
  output: {
    filename: "[name].[chunkhash:6].js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      }
    ]
  },
  plugins: [
    // clean dist folder
    new CleanWebpackPlugin(["dist"]),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "./static"),
        to: "static",
        ignore: [".*"]
      }
    ]),
    // specify the HTML template file
    // generator HtmlWebpackPlugin instance
    ...utils.pluginInstance()
  ],
  optimization: {
    // compress files
    minimize: true,
    // split vendor js into its own file
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  }
};
