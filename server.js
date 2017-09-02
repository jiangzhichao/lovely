const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./src/config');
const devConfig = require('./webpack/dev.config');

const server = new WebpackDevServer(webpack(devConfig), devConfig.devServer);

server.listen(config.port, config.host, () => {
    console.log('\n' + '-----lovely------> http://' + config.host + ':' + config.port + '\n');
});
