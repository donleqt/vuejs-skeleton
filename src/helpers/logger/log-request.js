const moment = require('moment');
const logger = require('./index');

function logRequest(req, data) {
  logger.debug('----------------------');
  logger.debug({
    headers: req.headers,
    url: req.originalUrl,
    method: req.method,
  });
  logger.debug('SSR middleware: ');
  logger.debug('', {
    render: `=====> ${data.render} <=====`,
    timeVN: moment
      .utc()
      .utcOffset(7)
      .format('DD-MM-YYYY HH:mm:ss'),
    ...data,
    url: req.originalUrl,
  });
}

function createRequestLogger(req) {
  const logData = {
    begin: Date.now(),
    render: 'Client',
  };

  const log = (data) => {
    data.duration = Date.now() - logData.begin;
    logRequest(req, { ...data });
  };

  return {
    log,
    reset: () => (logData.begin = Date.now()),
  };
}

module.exports = createRequestLogger;
