const path = require("path");
module.exports = {
  resolve: {
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        include: [path.resolve(__dirname, "src")],
      },
    ],
  },
  entry: "/src/index.ts",
  output: {
    publicPath: "public",
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  devServer: {
    open: ["/public"],
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9000,
  },
};
