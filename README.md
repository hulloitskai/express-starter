# express-starter
*An opinionated Typescript starter setup for [Express](https://www.expressjs.com), with [PM2](http://pm2.keymetrics.io) launching support. Works really well with [`ng-starter`](https://github.com/steven-xie/ng-starter)!*

This project is formatted with [Prettier](https://prettier.io), and compiles Typescript on-the-fly with [`ts-node`](https://github.com/TypeStrong/ts-node) (which actually has [*very little overhead*](https://www.bennadel.com/blog/3268-experimenting-with-ts-node-and-using-typescript-in-node-js-on-the-server.htm), and is [*usable in production*](https://github.com/TypeStrong/ts-node/issues/104#issuecomment-250252708)).

**Disable automatic TypeScript compilation in your IDE for this project; [`ts-node`](https://github.com/TypeStrong/ts-node) will take care of it.**

## Installation:
```bash
# If using Yarn:
yarn install

# If using NPM:
npm install
```

## Usage
### Starting the Server:
```bash
# If using Yarn:
yarn dev # starts a dev server with hot-reloading and detailed debugging.
yarn prod # starts a production server with debugging disabled and no hot-reloading.
yarn start # same as yarn prod

# If using NPM, replace 'yarn ...' with 'npm run ...' for each command.
```

### Default Endpoints:
* `/` - Endpoint for `dist/index.html`. Static assets are served from `dist/`.
* `/api` - Main API endpoint; returns a `text/plain` message indicating that the API is working.
* `/api/puppies` - Sample API endpoint that counts page refreshes. Sends data as `application/json`.

### PM2 Usage
To launch on a server with [PM2](http://pm2.keymetrics.io) installed globally, run with `yarn pm2` or `npm run pm2`. This will allow you to monitor the status of the server, and auto-restart it if it crashes. 

**PM2 must have Typescript installed: `pm2 install typescript`.**

## Configuration
### `package.json → config`:
* `devDebugLevel` – debugger verbosity for when the server is started in development mode *(by default, shows all express and server messages)*.
* `prodDebugLevel` – debugger verbosity for when the server is started in production mode *(by default, shows only server alerts and critical messages)*. 

### `pm2.ecosystem.config.js`
Allows you to configure custom properties for PM2 monitoring and remote deployment. [See the documentation for details](http://pm2.keymetrics.io/docs/usage/application-declaration/).