import createObserver from '../../helpers/javascript/observer';

const moduleEvent = createObserver();

if (global.isClient) {
  const Nanobar = require('nanobar');
  const nanobar = new Nanobar();
  moduleEvent.on('load', (promise) => {
    nanobar.go(37);
    nanobar.go(45);
    promise.then(() => nanobar.go(100));
  });
}

export default moduleEvent;
