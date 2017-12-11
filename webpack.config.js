const path = require('path');
const webpack = require('webpack');
const buildPath = path.resolve(__dirname, 'build');
const config = {
    entry: './src/index.js',
    output: {
        path: buildPath,
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './',
        devtool: 'eval',
        hot: true, // Live-reload
        inline: true,
        port: 21314, // Port Number
        host: 'localhost', // Change to '0.0.0.0' for external facing server
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)/,
                use: [
                    'babel-loader',
                    'eslint-loader'
                ]
            }, {
                test: /\.(sass|scss|css)/,
                use: [
                    "style-loader",
                    "css-loader",
                    "resolve-url-loader",
                    "sass-loader?sourceMap"
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    stats: {
        // Nice colored output
        colors: true
    },
}

module.exports = config;