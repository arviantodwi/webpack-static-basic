const path = require("path");
const env = require("./env");
const rules = require("./rules");
const webpack = require("webpack");
const template = require("./template");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const rootDir = path.resolve(__dirname, "../");
const srcDir = path.join(rootDir, "src");
const viewsDir = path.join(srcDir, "views");

module.exports = {
  // https://github.com/webpack/webpack-dev-server/issues/2758
  target: env.isProductionMode ? "browserslist" : "web",

  output: {
    path: path.join(rootDir, "dist"),
  },

  entry: {
    // Main app entry
    app: path.join(srcDir, "app.js"),

    // Add shared components below. Only for dependencies.
	//

    // Page entries. Add other page entries below.
    index: {
      import: path.join(viewsDir, "Index/index.js"),
      // dependOn: ["sharedEntry"],
    },
  },

  module: {
    rules,
  },

  plugins: [
    new webpack.ProvidePlugin({
      _: "lodash",
    }),

    new HtmlWebpackPlugin(
      template("Index/index.html", {
        includeEntries: ["index"]
      })
    ),
    // Add other HtmlWebpackPlugin view instances below
  ],

  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
    },
  },
};
