import createApp from './app';

const { nanobar } = global;
const { app, router } = createApp();

const bootstrap = async () => {
  if (!app.isBootstraped) {
    nanobar.go(10);
    // run app bootstrap first
    await app.bootstrap();
    app.isBootstraped = true;
    nanobar.go(100);
  }
};

const promise = bootstrap();

if (!document.querySelector('#app')) {
  const div = document.createElement('DIV');
  div.id = 'app';
  document.body.append(div);
}

// on router ready, mount the app
router.onReady(async () => {
  await promise;
  app.$mount('#app');
});