import createApp from './app';

const { nanobar } = global;
const { app, router } = createApp();

// add listener, to bootstrap the app before's it begin to mount any route
router.beforeEach(async (to, from, next) => {
  // if the app has not bootstraped yet
  if (!app.isBootstraped) {
    nanobar.go(60);
    // run app bootstrap first
    await app.bootstrap();
    app.isBootstraped = true;
    nanobar.go(100);
  }
  next();
});

if (!document.querySelector('#app')) {
  const div = document.createElement('DIV');
  div.id = 'app';
  document.body.append(div);
}

// on router ready, mount the app
router.onReady(async () => {
  app.$mount('#app');
});