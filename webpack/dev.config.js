const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const config = require('../src/config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const babelrc = JSON.parse(fs.readFileSync('./.babelrc'));
babelrc.plugins = [
    ...babelrc.plugins,
    ...babelrc.env.development.plugins
];
delete babelrc.env;
babelrc.plugins.forEach((plugin, index) => {
    if (Array.isArray(plugin) && index > 4) {
        plugin[1].transforms.push({
            transform: 'react-transform-hmr',
            imports: ['react'],
            locals: ['module']
        });
    }
});

module.exports = {
    entry: {
        main: [
            'webpack/hot/dev-server',
            `webpack-dev-server/client?http://${config.host}:${config.port}`,
            'index.js'
        ]
    },
    output: {
        filename: 'js/[hash].js',
        path: path.resolve(__dirname, '../build'),
        publicPath: '/'
    },
    devtool: 'inline-source-map',
    context: path.resolve(__dirname, '../src'),
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader?' + JSON.stringify(babelrc), 'eslint-loader']
            }, {
                test: /\.json$/, loader: 'json-loader',
            }, {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            }, {
                test: /\.less$/,
                loaders: ['style-loader', 'css-loader', 'less-loader']
            }, {
                test: /\.jpe?g$|\.gif$|\.png$/,
                loaders: ['url-loader?limit=10000&name=images/[name].[ext]']
            }, {
                test: /\.ico|\.svg$|\.woff$|\.ttf$|\.eot$/,
                loaders: ['url-loader?limit=10000&name=fonts/[name].[ext]']
            }, {
                test: /\.json$/,
                exclude: /node_modules/,
                loaders: ['json-loader']
            }, {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }, {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    resolve: {
        modules: [
            'src',
            'node_modules'
        ],
        extensions: ['.json', '.js', '.jsx']
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../build'),
        hot: true,
        noInfo: false,
        inline: true,
        stats: { colors: true },
        proxy: {
            '/ccm': {
                target: 'http://' + config.apiHost + ':' + config.apiPort,
                secure: false
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'lovely',
            filename: 'index.html',
            template: './helpers/template.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({ __DEVELOPMENT__: true })
    ]
};