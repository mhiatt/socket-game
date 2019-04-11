const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    devServer: {
        compress: true,
        port: 3000,
        contentBase: path.resolve(__dirname, 'dist')
    },
    entry: './client/js/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
    },
    module: {
        rules: [

        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'client', ignore: ['*.js'] }
        ])
    ]
};
