# dockerfile

##################################################
## DEVELOPMENT STAGE
##################################################

FROM node:10.4.0-alpine AS development

# Set labels
ARG BUILD_TAG="latest"
LABEL version=$BUILD_TAG maintainer="Steven Xie <dev@stevenxie.me>"

# Create app directory and bundle app source
WORKDIR /app
COPY . .

# Install Linux dependencies
RUN apk update && apk add --no-cache git

# Configure BUILD_ENV and IS_DOCKER variables
ARG BUILD_ENV="development"
ENV IS_DOCKER=true

# Install app dependencies; also, if constructing a production build,
#   precompile the Javascript, remove 'src/', and reinstall only production
#   dependencies
RUN echo "Building with BUILD_ENV: $BUILD_ENV" && yarn && \
    if [ "$BUILD_ENV" == production ]; then \
      echo "Precompiling to Javascript for production..." && \
      yarn compile && yarn --production --prefer-offline && \
      rm -rf src/; \
    else yarn cache clean; fi

# Configure NODE_ENV variable
ENV NODE_ENV=$BUILD_ENV

# Expose port and volume mount point
EXPOSE 3000
VOLUME /app

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
