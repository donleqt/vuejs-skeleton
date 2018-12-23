// client side config
const appConfig = process.env.APP_CONFIG;
const { api } = appConfig;
const mode = process.env.NODE_ENV;
if (appConfig.env !== 'production') {
  console.log('- mode::', mode);
}
api.endPoint = global.isClient ? appConfig.api.browserEndPoint : api.nodeEndPoint;

export default appConfig;
