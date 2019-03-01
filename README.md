# skeleton-vuejs

### Installation for development

Install node-modules:

``` 
$ yarn install 
```

Note: In case you fail to install the node-modules, please clone the `yarn.lock.example` file and rename as `yarn.lock` then try `yarn install` again.

Create your env config
``` 
$ cd ./config
$ cp development-example.json development.json
``` 
Now you have json config file: `./config/development.json`

Start hot reload development
```
$ yarn start
```
Start development render server
```
$ yarn server
```

### Installation for production

Install node-modules:

``` 
$ yarn install 
```

Create your env config
``` 
$ cd ./config
$ cp development-example.json production.json
``` 
Now you have json config file: `./config/production.json`

Build source code, client then server
```
$ yarn build && yarn build:server
```

Start NodeJS server to serve request
```
$ pm2 start process.json
```
Note: The server must have pm2 (sudo npm install -g pm2)

### Other commands

Run your tests
```
yarn run test
```

Lints and fixes files
```
yarn run lint
```

### Useful info
- If fail at `yarn install`, please clone `yarn.lock.example` to `yarn.lock` then try again.
- Setup eslint for your phpstorm: https://stackoverflow.com/questions/41735890/how-to-make-webstorm-format-code-according-to-eslint/42962953