const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const jsFiles = glob.sync("src/pages/**/index.js");
const htmlFiles = glob.sync("src/pages/**/index.html");
const cssFiles = glob.sync("src/pages/**/index.[css|scss]");

// generate entry config
exports.generateEntry = publicEntry => {
  const entry = {};
  jsFiles.forEach((file, index) => {
    const dirname = file.match(/^src\/pages\/(.+)\/index\.js$/)[1];
    if (dirname) {
      entry[dirname] = path.resolve(__dirname, file);
    }
  });
  return Object.assign(publicEntry, entry);
};

// TODO: generator ExtractTextWebpackPlugin instance

// generator HtmlWebpackPlugin instance
exports.pluginInstance = () => {
  const plugins = htmlFiles.map((file, index) => {
    const dirname = file.match(/^src\/pages\/(.+)\/index\.html$/)[1];
    if (dirname) {
      if (dirname !== "index") {
        return new HtmlWebpackPlugin({
          filename: dirname + "/index.html",
          template: file,
          chunks: ["vendor", "app", dirname]
        });
      } else {
        return new HtmlWebpackPlugin({
          filename: "index.html",
          template: file,
          chunks: ["vendor", "app", dirname]
        });
      }
    }
  });
  return plugins;
};
