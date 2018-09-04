const path = require('path');
const webpack = require('webpack');
module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, '.'),
    entry: {
        app: './app.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader', options: {
                        cacheDirectory: true
                    }
                }],
                exclude: /node_modules/
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: '[name].bundle.js',
    },
    plugins: [
        new webpack.NamedModulesPlugin()
    ]
};
