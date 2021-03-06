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
        {
          test: /\.m?js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: "스타트업 손익 계산기",
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
