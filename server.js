const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./src/config');
const devWebpackConfig = require('./webpack/dev.config');

const server = new WebpackDevServer(webpack(devWebpackConfig), {
    contentBase: './build',
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
},);

server.listen(config.port, config.host, () => {
    console.log('\n' + '-----lovely------> http://' + config.host + ':' + config.port + '\n');
});
