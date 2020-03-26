const config = require('../config');
const logger = require('../src/helpers/logger');
const childProcess = require('child_process');

const isDev = !!process.argv.find(v => v === '--dev');
const mode = config.build.mode;
const watchSSR = isDev ? '--w' : '';
const analyse = config.build.analyse && !watchSSR ? '--analyse' : '';
const clientCmd = `cross-env NODE_ENV=${mode} npx vue-cli-service build --no-clean --mode ${mode} ${analyse} ${watchSSR}`;
const serverCmd = `cross-env NODE_ENV=${mode} npx webpack --config webpack/webpack.server.config.js ${watchSSR}`;

// ==== BUILD client side app
logger.info('Build client files...');
childProcess.spawn(clientCmd, {
  shell: true,
  stdio: 'inherit',
});

// ==== BUILD server side render
if (config.build.skipSSR && !isDev) {
  logger.warn('Skip build server side render (your config)!');
} else {
  logger.info('Build server side files...');
  childProcess.spawn(serverCmd, {
    shell: true,
    stdio: 'inherit',
  });
}

if (isDev) {
  childProcess.spawn('yarn server', {
    shell: true,
    stdio: 'inherit',
  });
}