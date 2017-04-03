var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: ['webpack/hot/dev-server/', './examples/index.jsx'],
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'disqus-react': path.resolve(__dirname, 'src/disqus.jsx'),
        }
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'examples.bundle.js',
        publicPath: '/examples/js/',
    },
    module: {
        rules: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /(node_modules|build)/,
            include: [
                path.resolve(__dirname, 'src'),
                path.resolve(__dirname, 'examples'),
            ],
            query: {
                presets: [
                    'es2015',
                    'react'
                ],
            },
        }],
    },
};
