const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    vendor: ["lodash"],
    app: "./src/main.js",
    index: path.resolve(__dirname, "src/pages/index/index.js"),
    about: path.resolve(__dirname, "src/pages/about/index.js")
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist"
  },
  output: {
    filename: "[name].[hash:6].js",
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
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/pages/index/index.html",
      chunks: ["vendor", "app", "index"]
    }),
    new HtmlWebpackPlugin({
      filename: "about/index.html",
      template: "src/pages/about/index.html",
      chunks: ["vendor", "app", "about"]
    })
  ],
  optimization: {
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
