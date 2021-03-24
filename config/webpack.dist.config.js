var path = require('path');
var webpack = require('webpack');


module.exports = {
    devtool: 'source-map',
    context: path.resolve(__dirname, '../'),
    entry: ['./src/index.js'],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    output: {
        path: path.resolve('dist'),
        filename: 'index.js',
        library: 'ReactDisqus',
    },
    module: {
        rules: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /(node_modules|build)/,
            include: [
                path.resolve('src'),
            ],
        }],
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
    plugins: process.env.MINIFY ? [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
        }),
    ] : [],
};
