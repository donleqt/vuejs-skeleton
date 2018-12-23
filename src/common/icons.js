const iconFiles = require.context('@/assets/icons', false, /\.svg$/).keys();
const icons = {};

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
    return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/[-_\s]/g, '');
}

iconFiles.forEach((icon) => {
  const pat = /\/([^/]+)\.([a-z]{3})$/;
  const name = pat.exec(icon)[1];
  const ext = pat.exec(icon)[2];
  const camelName = camelize(name);
  // eslint-disable-next-line import/no-dynamic-require
  icons[camelName] = icons[name] = require(`@/assets/icons/${name}.${ext}`);
});

export default icons;
