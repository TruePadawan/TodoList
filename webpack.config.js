const path = require("path");

module.exports = {
  entry: {
    main: "./src/index.js",
    sidebar: "./src/sidebar.js"
  },
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: './dist',
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist/js"),
    // clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
};
