const bunyan = require('bunyan');
const bformat = require('bunyan-format');
const config = require('../../../config');

const formatOut = bformat({ outputMode: 'short', levelInString: true });

const log = bunyan.createLogger({
  name: config.name,
  level: config.nodeServer.logLevel,
  short: true,
  stream: formatOut,
});

module.exports = log;
