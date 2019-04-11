const config = require('../config');
const logger = require('../src/helpers/logger');
const childProcess = require('child_process');

const mode = config.build.mode;
const watchSSR = config.build.watchSSR ? '--w' : '';
const analyse = config.build.analyse && !watchSSR ? '--analyse' : '';
const clientCmd = `cross-env NODE_ENV=${mode} npx vue-cli-service build --mode ${mode} ${analyse} ${watchSSR}`;
const serverCmd = `cross-env NODE_ENV=${mode} npx webpack --config webpack/webpack.server.config.js ${watchSSR}`;


// ==== BUILD client side app
logger.info('Build client files...');
childProcess.spawn(clientCmd, {
  shell: true,
  stdio: 'inherit',
});

// ==== BUILD server side render
if (!config.build.skipSSR) {
  logger.info('Build server side files...');
  childProcess.spawn(serverCmd, {
    shell: true,
    stdio: 'inherit',
  });
} else {
  logger.warn('Skip build server side render (your config)!');
}