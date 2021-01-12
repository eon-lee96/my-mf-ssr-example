const webpack = require("webpack");
const ExtractCSSChunks = require("mini-css-extract-plugin");
const { ImportedPlugin } = require("webpack-imported");
const env = require("../env")();

const shared = [];
// Due to instability with webpack 4.20 and up, HardSourceWebpackPlugin will remain disabled
// env.raw.NODE_ENV === 'development' && shared.push(new HardSourceWebpackPlugin())

const client = [
  new webpack.DefinePlugin(env.stringified),
  new webpack.DefinePlugin({
    API_URL: JSON.stringify(require("../config")[env.raw.NODE_ENV].apiUrl),
    NAME: JSON.stringify("website1"),
  }),
  new ExtractCSSChunks(),
  new ImportedPlugin("imported.json"),
];

const server = [
  new webpack.DefinePlugin({
    API_URL: JSON.stringify(require("../config")[env.raw.NODE_ENV].apiUrl),
  }),
];

module.exports = {
  shared,
  client,
  server,
};
