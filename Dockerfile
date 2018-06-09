# dockerfile

## Development Stage
ARG NODE_VERSION="10.4.0"
FROM node:${NODE_VERSION}-alpine AS development

# Set labels
ARG VERSION="latest"
LABEL version=$VERSION maintainer="Steven Xie <dev@stevenxie.me>"

# Create app directory
WORKDIR /app

# Bundle app source
COPY . .

# If 'BUILD_ENV' build arg is available, use it here
ARG BUILD_ENV="development"
ENV NODE_ENV=$BUILD_ENV IS_DOCKER=true

# Install git, bash, package dependencies, and precompile if production
#   to prepare for the next build stage.
RUN apk update && apk add --no-cache git && yarn && \
    if [ "$BUILD_ENV" == "production" ]; then yarn compile; fi

# Expose port
EXPOSE 3000

# Declare mount point
VOLUME /app/build

# Default starting command
CMD [ "yarn", "start" ]


## Production Stage
FROM node:10.4.0-alpine AS production

# Set labels
ARG VERSION="latest"
LABEL version=$VERSION maintainer="Steven Xie <dev@stevenxie.me>"

# Create app directory
WORKDIR /app

# Bundle app source
COPY --from=development /app .

# If 'BUILD_ENV' build arg is available, use it here
ARG BUILD_ENV="production"
ENV NODE_ENV=$BUILD_ENV IS_DOCKER=true

# Remove source files
RUN rm -rf src/ 

# Expose port
EXPOSE 3000

# Declare mount point
VOLUME /app/build

# Default starting command
CMD [ "yarn", "start" ]
