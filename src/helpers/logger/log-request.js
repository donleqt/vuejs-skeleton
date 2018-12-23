const moment = require('moment');
const logger = require('./index');

function logRequest(req, data) {
  logger.debug('----------------------');
  logger.debug({
    headers: req.headers,
    url: req.originalUrl,
    method: req.method,
    timeVN: moment
      .utc()
      .utcOffset(7)
      .format('DD-MM-YYYY HH:mm:ss'),
  });
  logger.debug('SSR middleware: ');
  logger.debug('', {
    ...data,
    render: `=====> ${data.render} <=====`,
    url: req.originalUrl,
  });
}

function createRequestLogger(req) {
  const logData = {
    begin: Date.now(),
    render: 'Client',
  };

  const log = (data) => {
    logData.duration = Date.now() - logData.begin;
    logRequest(req, { ...logData, ...data });
  };

  return {
    log,
    reset: () => (logData.begin = Date.now()),
  };
}

module.exports = createRequestLogger;
