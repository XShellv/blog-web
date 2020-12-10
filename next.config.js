const withLess = require("@zeit/next-less");
const withCss = require("@zeit/next-css");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const webpack = require('webpack')
const path = require("path");

module.exports = withBundleAnalyzer(
  withCss(
    withLess({
      lessLoaderOptions: {
        javascriptEnabled: true,
      },
      images: {
        domains: ['cdn.xshellv.com'],
      },
      webpack: (config, { isServer }) => {
        if (isServer) {
          const antStyles = /antd\/.*?\/style.*?/;
          const origExternals = [...config.externals];
          config.externals = [
            (context, request, callback) => {
              if (request.match(antStyles)) return callback();
              if (typeof origExternals[0] === "function") {
                origExternals[0](context, request, callback);
              } else {
                callback();
              }
            },
            ...(typeof origExternals[0] === "function" ? [] : origExternals),
          ];
          config.module.rules.unshift({
            test: antStyles,
            use: "null-loader",
          });
        }
        config.plugins.push(
          new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        );
        config.module.rules.push({
          enforce: "pre",
          test: /\.less$/,
          use: [
            {
              loader: "sass-resources-loader",
              options: {
                resources: [path.resolve("./style/abstracts/variables.less")],
              },
            },
          ],
        });
        return config;
      },
      analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
      analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
      bundleAnalyzerConfig: {
        server: {
          analyzerMode: "static",
          reportFilename: "../bundles/server.html",
        },
        browser: {
          analyzerMode: "static",
          reportFilename: "../bundles/client.html",
        },
      },
    })
  )
);
