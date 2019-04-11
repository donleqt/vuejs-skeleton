# VUE-APP - Server Side Render Development Guideline

# Table of Contents

* [What is SSR mode?](#what-is-ssr-mode)
* [Config Node Server and build mode](#config-node-server-and-build-mode)
* [Config REST-API's Endpoint](#config-rest-apis-endpoint)
* [Start Development](#start-development)
* [Handle Errors](#handle-errors)

# What is SSR mode?
Vue.js is a framework for building client-side applications. By default, Vue components produce and manipulate DOM in the browser as output. However, it is also possible to render the same components into HTML strings on the server, send them directly to the browser, and finally "hydrate" the static markup into a fully interactive app on the client.

A server-rendered Vue.js app can also be considered "isomorphic" or "universal", in the sense that the majority of your app's code runs on both the server and the client. [Read more](https://ssr.vuejs.org)

# Config Node Server and build mode

Edit related fields in vue-app config file `./config/development.json` 
Optimized options for ssr-development is the following:

```
{
  ...
  "nodeServer": {
    "port": 5000,
    "ssrAll": true,
    "useCachePage": false,
    "cacheTime": 5000,
    "logLevel": "debug"
  },
  "build": {
    "mode": "development",
    "analyse": false,
    "skipSSR": false,
    "watchSSR": true,
    "outputDir": "dist",
    "outputSSR": "dist-ssr"
  },
  ...
}
```
In build.mode = "development"
Vue will warning about "hydrate" mismatch. You need to follow the warning log and try to correct them for 
performance on production build.

# Start Development
Please follow all the steps, including the order of commands.
* Build client side files and server side bundle by executing:
```
$ yarn build
```
By using watchSSR = "true" in the config file, this command will hot reload
* Start Nodejs server:
```
$ yarn server
```

# Handle Errors
The following are some popular errors and fixing solution when running our app in SSR mode.
* window/document is undefined:
  - How to resolve: Use global.isServer to check current mode, then skip the code blocks which includes window/document if needed.
* errors are thrown from non compatible library: 
  - How to resolve: Use safe-import to resolve, `./src/helpers/vue/safe-import.js`
* component is not compatible: 
  - How to resolve: Use safe-export to exclude rendering that component on SSR, `./src/helpers/vue/safe-export.js`