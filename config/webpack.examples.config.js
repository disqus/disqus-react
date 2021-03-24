var path = require('path');


module.exports = {
    mode: 'production',
    devtool: 'source-map',
    context: path.resolve(__dirname, '../'),
    entry: ['webpack/hot/dev-server/', './examples/index.jsx'],
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'disqus-react': path.resolve('src/index.js'),
        },
    },
    output: {
        path: path.resolve('examples/build'),
        filename: 'examples.bundle.js',
        publicPath: '/examples/js/',
    },
    module: {
        rules: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /(node_modules|build)/,
            include: [
                path.resolve('src'),
                path.resolve('examples'),
            ],
        }],
    },
};
