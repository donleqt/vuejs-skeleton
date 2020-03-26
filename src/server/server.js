const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const config = require('../../config');
const log = require('../helpers/logger');
const ssrMiddleware = require('./ssr');

function startServer() {
  const app = express();
  const server = http.createServer(app);
  app.use(express.static(config.vueAppPath));
  app.use(express.static(`${config.projectRoot}/public`));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false,
  }));

  app.use('*', ssrMiddleware);

  const { port } = config.nodeServer;
  server.listen(port);
  server.on('listening', () => {
    log.info('\nNode Server listened on port', port);
  });
  return server;
}

module.exports = startServer;
