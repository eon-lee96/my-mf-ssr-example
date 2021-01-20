const path = require("path");
module.exports = {
  extensions: [".js", ".mjs", ".jsx", ".css"],
  alias: {
    "react-imported-component$": path.resolve(
      __dirname,
      "../../react-imported-component/es2015/entrypoints/index.js"
    ),
  },
};
