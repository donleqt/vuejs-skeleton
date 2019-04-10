import createApp from './app';

const { nanobar } = global;
const { app, router } = createApp();

const bootstrap = async () => {
  if (!app.isBootstraped) {
    nanobar.go(60);
    // run app bootstrap first
    await app.bootstrap();
    app.isBootstraped = true;
    nanobar.go(100);
  }
};

if (!document.querySelector('#app')) {
  const div = document.createElement('DIV');
  div.id = 'app';
  document.body.append(div);
}

router.beforeEach(async (to, from, next) => {
  // if the app has not bootstraped yet
  await bootstrap();
  next();
});

// on router ready, mount the app
router.onReady(async () => {
  app.$mount('#app');
});