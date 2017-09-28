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
            `webpack-dev-server/client?http://${config.host}:${config.port}`,
            'webpack/hot/dev-server',
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
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader?' + JSON.stringify(babelrc), 'eslint-loader']
            }, {
                test: /\.json$/,
                use: ['json-loader']
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            }, {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
            }, {
                test: /\.jpe?g$|\.gif$|\.png$/,
                use: ['url-loader?limit=10000&name=images/[name].[ext]']
            }, {
                test: /\.ico|\.svg$|\.woff$|\.ttf$|\.eot$/,
                use: ['url-loader?limit=10000&name=fonts/[name].[ext]']
            }, {
                test: /\.json$/,
                exclude: /node_modules/,
                use: ['json-loader']
            }, {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            }, {
                test: /\.html$/,
                use: 'html-loader'
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