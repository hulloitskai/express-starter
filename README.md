# express-starter

*An opinionated Typescript starter setup for [Express](https://www.expressjs.com) + [Pino](https://getpino.io). Deployable with [Docker](https://www.docker.com) and [PM2](http://pm2.keymetrics.io). Works really well with [`ng-starter`](https://github.com/steven-xie/ng-starter)!*

[![Travis CI](https://img.shields.io/travis/steven-xie/express-starter.svg)](https://travis-ci.org/steven-xie/express-starter/) [![CodeClimate: Maintainability](https://api.codeclimate.com/v1/badges/2ea966de97291efee5c1/maintainability)](https://codeclimate.com/github/steven-xie/express-starter/maintainability) [![docker hub: latest](https://img.shields.io/badge/docker%20hub-latest-008bb8.svg)](https://hub.docker.com/r/stevenxie/express-starter/) [![type definitions: Typescript](https://img.shields.io/badge/type%20definitions-Typescript-blue.svg)](https://www.typescriptlang.org) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Installation:

```bash
# If using Yarn:
yarn install

# If using NPM:
npm install
```


<br />


## General usage

### Starting the server:

```bash
# If using Yarn:
yarn dev    # starts a dev server with hot-reloading
            # and detailed debugging.
yarn prod   # starts a production server with minimal
            # debugging and no hot-reloading.  
yarn start  # selects 'yarn dev' or 'yarn prod' based
            # on your NODE_ENV

# If using NPM, replace 'yarn ...' with 'npm run ...'
#   However, 'yarn' is highly recommended for a more
#   deterministic package installation!
```

### Default endpoints:

* `/` - Endpoint for `static/index.html`. Static assets are served from `static/`.

  > *Note that in production, usage of Express as a static asset server is discouraged, as it is much more efficient to use NGINX to serve static content, and to use Express only as an API server.*

* `/api` - Main API endpoint; returns a `text/plain` message indicating that the
  API is working.
* `/api/puppies` - Sample API endpoint that counts page refreshes. Sends data
  as `application/json`.


<br />


## Usage with Docker

### Setup

_**Method 1:** Building an image from scratch._

First, edit `package.json`'s *config* section:
* Set `docker-image-version` to a pattern that matches **#.#.#** (typically
  using [*semver*](https://semver.org))). This affects the tag of the
  built **Docker image** (which will look something along the lines of
  **#.#.#-prod** or **#.#.#-dev**), and also sets the image **version** label.

Now, decide whether you want to build for **production** or **development**
(this affects the installed dependencies, and whether `express-starter` runs
in development / production mode), and run the associated command:

```bash
# dk = docker

## For a production build:
yarn dk-build-prod
## Or, a shorter alias for the above:
yarn dk-build 

## For a development build:
yarn dk-build-dev
```

Once you build a version, the `.env` file will be populated with the build
configuration (i.e. `BUILD_ENV` and `BUILD_TAG`). 

_**Method 2:** Pulling a remote registry image._

Pull the latest image from Docker Hub:

```bash
docker pull stevenxie/express-starter
```

Then, start a container from [Docker Compose](https://docs.docker.com/compose/)
(which is named `express-starter`, configured to expose port **3000**, and
mount a volume named `express-vol`). If no image has been built, it will also
build an image before starting a container from it. *Make sure you have
[Docker Compose](https://docs.docker.com/compose/) installed, or look up how
to manually configure a build with `docker build`!*

```bash
# To see output in the console foreground (dk = docker)
yarn dk-foreground

# To run in the background
yarn dk-up
```

### Normal usage

To instantiate a container, run `yarn dk-up`. If no image is built, it will
also build the initial image.

> *For more information about Docker images and containers, please see [Docker's  documentation](https://docs.docker.com/v17.09/engine/userguide/storagedriver/imagesandcontainers/).*

To stop the container, run `yarn dk-stop`, and to run it again, run
`yarn dk-start`. The container can also be paused with `yarn dk-pause`.

To remove the container entirely, run `yarn dk-down`. To also remove images,
run `yarn dk-purge`.

> See the `package.json` for more useful Docker-related scripts! Each Docker 
> script is prefixed with `dk-`.

If you have multiple environments / tags, you can have the `yarn dk-...` scripts
target a different image by editing the `.env` file with the correct `BUILD_ENV`
and `BUILD_TAG`.

### Accessing Volumes on Mac OS X

If you're on a Mac, you won't be able to access the `express-vol` Docker
volume directly through the filesystem; you'll have to access it through
Docker's VM as follows:

```bash
screen ~/Library/Containers/com.docker.docker/Data/com.docker.driver.amd64-linux/tty

# At this point, your screen will become blank.
#   Press enter, and wait for the prompt to show up.
#   When it does, you can access the volumes at the
#   following location:
cd /var/lib/docker/volumes
```


<br />


## Usage with PM2 

To launch on a server with [PM2](http://pm2.keymetrics.io) installed globally,
run with `yarn pm2` or `npm run pm2`. This will allow you to monitor the status
of the server, and auto-restart it if it crashes.

### Using auto-deployment:

If you have your server settings correctly filled out in
**pm2.ecosystem.conf.js → deployment**, and your server has your GitHub SSH
keys / credentials, then you can set-up the server instantly as follows:

```bash
# Assuming using Yarn:
yarn pm2-setup
yarn pm2-deploy
```

After that, every time you want to update to the latest Git commit, just run
`yarn pm2-update`. If you've at some point performed a `git push --force`,
then it is necessary to run `yarn pm2-update-force` instead.


<br />


## Configuration

### package.json: config

* `dev-log-level` – logging level for when the server is started in
  development mode _(default: `debug`)_.
* `prod-log-level` – logging level for when the server is started in
  production mode _(default: `error`)_.
* `jmespath-log-filter` – the filter to be applied to the console
  output logs during development. Uses the
  [JMESPath query language](http://jmespath.org). To show all output,
  set to: `*`. _(default: `` contains(name, `server`) ``)_
* `browser-live-reload` – whether or not you would like the _browser_ to reload
  when you save your code. Useful if you're making visual changes. (The server
  itself will always live-reload to reflect new changes). _(default: `false`)_
* `docker-image-version` — a pattern that matches **#.#.#** (typically using
  [semver](https://semver.org)). This affects the tag of the built
  **docker image** (which will look something along the lines of **#.#.#-prod**
  or **#.#.#-dev**), and also sets the image **version** label.

### docker-compose.yml
The '**services → express → environment**' section can be configured with
environment variables like `NODE_ENV`, `LOG_LEVEL`, and `LOG_FILTER`, which
will override related settings in the NPM package configuration.

### pm2.ecosystem.config.js

Allows you to configure custom properties for [PM2](https://pm2.io) monitoring
and remote deployment. [See the documentation for details](http://pm2.keymetrics.io/docs/usage/application-declaration/).
