/* eslint-disable */
const LRU = require('lru-cache');
const createRequestLogger = require('../../helpers/logger/log-request');
const createRenderer = require('./renderer');
const { nodeServer } = require('../../../config');

const cacher = new LRU({
  max: 100,
  maxAge: nodeServer.cacheTime || 2000,
});

const isUseCache = req => nodeServer.useCachePage;
const renderer = createRenderer();

function ssrMiddleware(req, res) {
  const isCachable = isUseCache(req);
  const logger = createRequestLogger(req);
  const cacheKey = req.originalUrl;

  if (req.query.clearCache) {
    cacher.reset();
  }

  const context = { url: req.originalUrl, res, req, logger, nodeServer };
  if (isCachable) {
    const hit = cacher.has(cacheKey) && cacher.get(cacheKey);
    if (hit) {
      logger.log({ render: 'HTML Cached' });
      return res.send(hit);
    }
  }

  renderer
    .renderToString(context)
    .then(html => {
      const { router } = context;
      const code = router.code || 200;
      if (router.redirectPath) {
        res.redirect(code, router.redirectPath);
      } else {
        res.status(code);
        res.send(html);
      }
      if (isCachable && code === 200) {
        cacher.set(cacheKey, html);
      }
      logger.log({ 
        render: 'Server Side- No Cached'
      });
    })
    .catch(err => {
      res
      .status(500)
      .json({
        error: true,
        message: err.message
      });
      console.error(err);
    });
}

module.exports = ssrMiddleware;
