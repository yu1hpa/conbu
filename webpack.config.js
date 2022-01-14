const path = require("path");
module.exports = {
  mode: "development",
  entry: [path.resolve(__dirname, "./src/index.tsx")],
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "./dist/")
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
  }
};
