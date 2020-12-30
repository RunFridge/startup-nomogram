const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const appIndex = path.resolve(__dirname, "src", "index.tsx");
const appDist = path.resolve(__dirname, "dist");
const appHtml = path.resolve(__dirname, "public", "index.html");

module.exports = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv.development ? true : false;
  const isEnvProduction = webpackEnv.production ? true : false;

  return {
    mode: isEnvDevelopment ? "development" : isEnvProduction && "production",
    entry: appIndex,
    output: {
      path: appDist,
      filename: "bundle.js",
      chunkFilename: "[name].js",
    },
    cache: {
      type: "memory",
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "ts-loader",
            options: {
              transpileOnly: isEnvDevelopment,
            },
          },
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: "React + TS template",
        template: appHtml,
      }),
      new WebpackManifestPlugin(),
    ],
    devtool: "source-map",
    devServer: {
      contentBase: appDist,
      inline: true,
      host: "localhost",
      port: 3000,
    },
  };
};
