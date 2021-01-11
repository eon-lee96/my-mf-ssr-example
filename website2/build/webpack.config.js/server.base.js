const path = require("path");
const { merge } = require("webpack-merge");
const fs = require("fs");
const webpack = require("webpack");
const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
const common = require("./common.base");
const { server: serverLoaders } = require("./loaders");
const plugins = require("./plugins");
const config = require("../config");
const { serverPath } = config[process.env.NODE_ENV || "development"];

const deps = require("../../package.json").dependencies;
const devDeps = require("../../package.json").devDependencies;

const allDeps = {
  ...deps,
  ...devDeps,
};

const shared = Object.keys(allDeps).reduce((prev, curr) => {
  return {
    ...prev,
    [curr]: {
      requiredVersion: allDeps[curr],
      singleton: true,
    },
  };
}, {});

delete shared["@babel/polyfill"];

module.exports = merge(common, {
  name: "server",
  target: "async-node",
  entry: ["@babel/polyfill", path.resolve(__dirname, "../../server/index.js")],
  output: {
    path: serverPath,
    filename: "[name].js",
    libraryTarget: "commonjs2",
  },
  externals: ["enhanced-resolve"],
  module: {
    rules: serverLoaders,
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    ...plugins.server,
    new webpack.HotModuleReplacementPlugin(),
    new ModuleFederationPlugin({
      name: "website2",
      library: { type: "commonjs2" },
      filename: "container.js",
      exposes: {
        "./SomeComponent": "./src/components/SomeComponent",
      },
      shared: [
        {
          ...shared,
        },
      ],
    }),
  ],
  stats: {
    colors: true,
  },
});
