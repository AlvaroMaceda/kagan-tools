const path = require("path");
const merge = require("webpack-merge");

const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",

    devServer: {
        disableHostCheck: true,
        host: '0.0.0.0',
        port: 8081
    },

    serve: {
        host: '0.0.0.0',
        port: 8081,
        // The path, or array of paths, from which static content will be served.
        // Default: process.cwd()
        // see https://github.com/webpack-contrib/webpack-serve#options
        content: path.resolve(__dirname, "dist"),
    },


});