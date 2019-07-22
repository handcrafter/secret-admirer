var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry : './client/index.jsx',
    output : {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            { test: /\.(jsx)$/, use: 'babel-loader' },
            { test: /\.(css)$/, use: [ 'style-loader','css-loader'] }
        ]
    },
    externals: {
        puppeteer: require("puppeteer")
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'client/index.html'
        })
    ]
};
