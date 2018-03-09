# express-starter
*A starter setup for [Express](https://www.expressjs.com), with [PM2](http://pm2.keymetrics.io) launching support.*

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
yarn prod # starts a production server with no debug output and no hot-reloading.
yarn start # same as yarn prod

# If using NPM, replace 'yarn ...' with 'npm run ...' for each command.
```

### Default Endpoints:
* `/` - Endpoint for `dist/index.html`. Static assets are served from `dist/`.
* `/api` - Main API endpoint; returns `text/plain` message indicating that the API is working.
* `/api/puppies` - Sample API endpoint that counts page refreshes. Sends data as `application/json`.

### PM2 Usage
To launch on a server with `pm2` installed globally, run with `yarn pm2` or `npm run pm2`.
