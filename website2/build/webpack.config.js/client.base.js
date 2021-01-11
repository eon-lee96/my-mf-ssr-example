const path = require("path");
const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
const { client: clientLoaders } = require("./loaders");
const plugins = require("./plugins");
const common = require("./common.base");

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
  name: "client",
  target: "web",
  entry: ["@babel/polyfill", path.resolve(__dirname, "../../src/index.js")],
  output: {
    publicPath: "http://localhost:3002/static/",
  },
  module: {
    rules: clientLoaders,
  },
  plugins: [
    ...plugins.client,
    new ModuleFederationPlugin({
      name: "website2",
      library: { type: "var", name: "website2" },
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
});
