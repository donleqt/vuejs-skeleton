const config = require('../config');
const logger = require('../src/helpers/logger');
const childProcess = require('child_process');

const argv = process.argv;
const mode = config.build.mode;
const watchSSR = config.build.watchSSR ? '--w' : '';
const analyse = config.build.analyse && !watchSSR ? '--analyse' : '';
const clientCmd = `cross-env NODE_ENV=${mode} npx vue-cli-service build --mode ${mode} ${analyse}`;
const serverCmd = `cross-env NODE_ENV=${mode} npx webpack --config webpack/webpack.server.config.js ${watchSSR}`;


// ==== BUILD client side app
logger.info('Build client files...');
childProcess.spawnSync(clientCmd, {
  shell: true,
  stdio: 'inherit',
});

// ==== BUILD server side render
if (!config.build.skipSSR && !argv.includes('--no-ssr')) {
  logger.info('Build server side files...');
  childProcess.spawn(serverCmd, {
    shell: true,
    stdio: 'inherit',
  });
} else {
  logger.warn('Skip build server side render (your config)!');
}