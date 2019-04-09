"use strict";

const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  modify: (baseConfig, { dev }) => {
    const appConfig = Object.assign({}, baseConfig);

    // Setup SCSS
    const cssLoader = {
      loader: "css-loader",
      options: {
        minimize: !dev,
        sourceMap: dev,
        importLoaders: 1
      }
    };

    const postCSSLoader = {
      loader: "postcss-loader",
      options: {
        ident: "postcss", // https://webpack.js.org/guides/migrating/#complex-options
        sourceMap: dev,
        plugins: () => [
          autoprefixer({
            browsers: [
              ">1%",
              "last 4 versions",
              "Firefox ESR",
              "not ie < 9" // React doesn't support IE8 anyway
            ]
          })
        ]
      }
    };

    const sassLoader = {
      loader: "sass-loader",
      options: {
        sourceMap: dev
      }
    };

    if (dev) {
      // For development, include source map
      appConfig.module.rules.push({
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          cssLoader,
          postCSSLoader,
          sassLoader,
        ],
      });

      appConfig.plugins.push(new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
      }));
    } else {
      // For production, extract CSS
      appConfig.module.rules.push({
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          cssLoader,
          postCSSLoader,
          sassLoader,
        ],
      });

      appConfig.plugins.push(new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
      }));
    }

    return appConfig;
  }
};