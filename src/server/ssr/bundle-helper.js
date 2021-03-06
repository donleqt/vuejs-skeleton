const path = require('path');
const fs = require('fs');
const { spawnSync } = require('child_process');
const log = require('../../helpers/logger');
const config = require('../../../config');

const srcDir = path.join(config.projectRoot, 'src');
const ssrBuiltPath = config.build.outputSSR ? `${config.projectRoot}/${config.build.outputSSR}` : config.vueAppPath;

const files = {
  serverJson: path.resolve(ssrBuiltPath, './vue-ssr-server-bundle.json'),
  clientJson: path.resolve(config.vueAppPath, './vue-ssr-client-manifest.json'),
  templateHtml: path.resolve(`${srcDir}/templates/index.html`),
};

function validateAndBuildBundle() {
  if (!fs.existsSync(files.clientJson) || !fs.existsSync(files.serverJson)) {
    log.info('- Build client, server packages');
    spawnSync('yarn', ['build']);
  }
}

function getBundleParts() {
  const serverBundle = JSON.parse(fs.readFileSync(files.serverJson).toString('utf-8'));
  const clientManifest = JSON.parse(fs.readFileSync(files.clientJson.toString('utf-8')));
  let template = fs.readFileSync(files.templateHtml).toString('utf-8');
  template = template.replace(/\[ssr]-->/ig, '').replace(/<!--\[ssr]/ig, '');
  template = template.replace(/<!--\[browser]-->[\S\s]+?<!--\[\/browser]-->/igm, '');
  return {
    serverBundle,
    clientManifest,
    template,
  };
}

// export
const bundleHelper = {
  files,
  validateAndBuildBundle,
  getBundleParts,
};

module.exports = bundleHelper;
