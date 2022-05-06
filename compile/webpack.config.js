const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    mode:"development",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'assets/index.html'
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'assets'),
        },
        client: {
            progress: true,
        },
        open: true,
        compress: true,
        port: 9100,
    },
};
