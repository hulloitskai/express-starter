# dockerfile

##################################################
## DEVELOPMENT STAGE
##################################################

FROM node:10.4.0-alpine AS development

# Set labels
ARG VERSION="latest"
LABEL version=$VERSION maintainer="Steven Xie <dev@stevenxie.me>"

# Create app directory and bundle app source
WORKDIR /app
COPY . .

# If 'BUILD_ENV' build arg is available, use it here
ARG BUILD_ENV="development"

# Install git, bash, package dependencies. If constructing a production build,
#   precompile the Javascript, remove 'src/', and reinstall only production
#   dependencies. 
RUN echo "Building with BUILD_ENV: '$BUILD_ENV'" && \
    apk update && apk add --no-cache git && yarn && \
    if [ "$BUILD_ENV" == production ]; then \
      echo "Precompiling to Javascript for production..." && \
      yarn compile && yarn --production --prefer-offline && \
      rm -rf src/; \
    else \
      yarn cache clean; \
    fi

# Configure environment variables
ENV NODE_ENV=$BUILD_ENV IS_DOCKER=true

# Expose port and volume mount point
EXPOSE 3000
VOLUME /app/build

# Configure starting command
CMD [ "yarn", "start" ]


##################################################
## PRODUCTION STAGE 
##################################################

FROM node:10.4.0-alpine AS production

# Set labels
ARG VERSION="latest"
LABEL version=$VERSION maintainer="Steven Xie <dev@stevenxie.me>"

# Create app directory and extract production build from previous stage 
WORKDIR /app
COPY --from=development /app .

# If 'BUILD_ENV' build arg is available, use it here
ARG BUILD_ENV="production"
ENV NODE_ENV=$BUILD_ENV IS_DOCKER=true

# Expose port and volume mount point
EXPOSE 3000
VOLUME /app/build

# Configure starting command
CMD [ "yarn", "start" ]
