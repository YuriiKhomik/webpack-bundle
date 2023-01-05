const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: {
    main: path.resolve(__dirname, "./src/index.js"),
    // Runtime code for hot module replacement
    hot: "webpack/hot/dev-server.js",
    // Dev server client for web socket transport, hot and live reload logic
    client: "webpack-dev-server/client/index.js?hot=true&live-reload=true",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
  },
  devServer: {
    port: 4444,
    client: {
      progress: true,
    },
    // Dev server client for web socket transport, hot and live reload logic
    hot: false,
    client: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "webpack bundle",
      template: path.resolve(__dirname, "./src/template.html"), // template file
      filename: "index.html", // output file
    }),
    new CleanWebpackPlugin(),
    // Plugin for hot module replacement
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      // Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      // Fonts and SVGs
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
      // CSS, PostCSS, and Sass
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
    ],
  },
};
