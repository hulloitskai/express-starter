# express-starter

*An opinionated Typescript starter setup for [Express](https://www.expressjs.com) + [Pino](https://getpino.io). Deployable with [Docker](https://www.docker.com) and [PM2](http://pm2.keymetrics.io). Works really well with [`ng-starter`](https://github.com/steven-xie/ng-starter)!*

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![type definitions: Typescript](https://img.shields.io/badge/type%20definitions-Typescript-blue.svg)](https://www.typescriptlang.org) [![docker hub: available](https://img.shields.io/badge/docker%20hub-available-008bb8.svg)](https://hub.docker.com/r/stevenxie/express-starter/)

This project is formatted with [Prettier](https://prettier.io), and compiles Typescript on-the-fly with [`ts-node`](https://github.com/TypeStrong/ts-node) (which actually has [*very little overhead*](https://www.bennadel.com/blog/3268-experimenting-with-ts-node-and-using-typescript-in-node-js-on-the-server.htm), and is [*usable in production*](https://github.com/TypeStrong/ts-node/issues/104#issuecomment-250252708)).

**Disable automatic TypeScript compilation in your IDE for this project; [`ts-node`](https://github.com/TypeStrong/ts-node) will take care of it.**

## Installation:

```bash
# If using Yarn:
# yarn install

# If using NPM:
npm install
```

## Usage

### Starting the Server:

```bash
# If using Yarn:
yarn dev    # starts a dev server with hot-reloading
            # and detailed debugging.
yarn prod   # starts a production server with minimal
            # debugging and no hot-reloading.  
yarn start  # same as yarn prod

# If using NPM, replace 'yarn ...' with 
#   'npm run ...' for each command.
```

### Default Endpoints:

* `/` - Endpoint for `dist/index.html`. Static assets are served from `dist/`.
* `/api` - Main API endpoint; returns a `text/plain` message indicating that the API is working.
* `/api/puppies` - Sample API endpoint that counts page refreshes. Sends data as `application/json`.

### PM2 Usage:

To launch on a server with [PM2](http://pm2.keymetrics.io) installed globally, run with `yarn pm2` or `npm run pm2`. This will allow you to monitor the status of the server, and auto-restart it if it crashes. **PM2 must have Typescript installed: `pm2 install typescript`.**

#### Using auto-deployment:

If you have your server settings correctly filled out in `pm2.ecosystem.conf.js → deployment`, and your server has your GitHub SSH keys / credentials, then you can set-up the server instantly as follows:

```bash
# If using Yarn:
yarn pm2-setup
yarn pm2-deploy
```

After that, every time you want to update to the latest Git commit, just run `yarn pm2-update`. If you've at some point performed a `git push --force`, then it is necessary to run `yarn pm2-update-force` instead.

## Docker Usage

### Setup

_**Method 1:** Building an image from scratch._

First, edit `package.json`'s *config* section:
* Set `docker-build-env` to one of *"production"*, *"development"* (this affects the installed dependencies, and whether `express-starter` runs in development / production mode).
* Set `docker-tag` to a pattern that matches *"#.#.#-prod"* or *"#.#.#-dev"* (this affects the tag of the build *docker image*, and sets the image "version" label in the *Dockerfile*).

```bash
yarn docker-build
```

_**Method 2:** Pulling an image from Docker Hub:_

```bash
docker pull stevenxie/express-starter
```

Then, start a container from Docker Compose (which is configured to expose port _3000_, and named `express-starter`, and mount a volume named `express-vol`). If no image has been built, it will also build an image before starting a container from it. *Make sure you have Docker Compose installed, or look up how to manually configure a built with `docker build`!*

```bash
# To see output inline
yarn docker-inline

# To run in the background
yarn docker-up
```

### Regular usage

To stop the container, run `yarn docker-stop`, and to run it again, run `yarn docker-start`. The container can also be paused with `yarn docker-pause`.

To remove the container entirely, run `yarn docker-down`.

### Accessing Volumes on Mac OS X

If you're on a Mac, you won't be able to access the `express-vol` Docker volume directly through the filesystem: You have to access it through Docker's VM as follows:

```bash
screen ~/Library/Containers/com.docker.docker/Data/com.docker.driver.amd64-linux/tty

# At this point, your screen will become blank.
#   Press enter, and wait for the prompt to show up.
#   When it does, you can access the volumes at the
#   following location:
cd /var/lib/docker/volumes
```

## Configuration

### `package.json → config`:

* `dev-log-level` – logging level for when the server is started in development mode _(default: `debug`)_.
* `prod-log-level` – logging level for when the server is started in production mode _(default: `error`)_.
* `jmespath-log-filter` – the filter to be applied to the console output logs during development. Uses the [JMESPath query language](http://jmespath.org). To show all output, use: `*`. _(default: `` contains(name, `server`) ``)_
* `browser-live-reload` – whether or not you would like the _browser_ to reload when you save your code. Useful if you're making visual changes. (The server itself will always live-reload to reflect new changes). _(default: `true`)_
* `docker-build-env` – the Node environment that Docker will package for when building an image. Should be one of *"production"*, *"development"*. Docker will not package *devDependencies* as part of the build process when this is set to *"production"*.
* `docker-tag` – the version tag that Docker will label the image with during the build process. Conventionally follows the pattern of *"#.#.#-(ENV NAME)"*.

### `docker-compose.yml`:
The `services → express → environment` section can be configured with environment variables like `NODE_ENV`, `LOG_LEVEL`, and `LOG_FILTER`, which will override related settings in the NPM package configuration.

### `pm2.ecosystem.config.js`

Allows you to configure custom properties for PM2 monitoring and remote deployment. [See the documentation for details](http://pm2.keymetrics.io/docs/usage/application-declaration/).
