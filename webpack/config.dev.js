const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./config.common");

const rootDir = path.resolve(__dirname, "../");
const buildDir = path.join(rootDir, "dist");
const srcDir = path.join(rootDir, "src");

module.exports = merge(common, {
  mode: "development",

  devtool: "inline-source-map",

  devServer: {
    port: 8080,
    contentBase: [buildDir, srcDir],
  },
});
