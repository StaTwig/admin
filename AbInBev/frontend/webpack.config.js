const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  entry: [
    "react-hot-loader/patch",
    "webpack-hot-middleware/client",
    path.resolve("src/index.js"),
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        // Don't use .babelrc in `yarn link`-ed dependency's directory and use in current direction instead
        loader:
          "babel-loader?babelrc=false&extends=" +
          path.resolve(__dirname, ".babelrc"),
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
        // loader: "url?limit=10000"
        use: "url-loader",
      },
      {
        test: /\.(ttf|eot|svg|png|jpg)(\?[\s\S]+)?$/,

        use: "file-loader",
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  resolveLoader: {
    modules: ["node_modules"],
  },
};
