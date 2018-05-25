# dockerfile

FROM node:9.11.1-alpine

# Set labels
ARG VERSION="latest"
LABEL version=$VERSION maintainer="Steven Xie <dev@stevenxie.me>"

# Create app directory
WORKDIR /app

# Bundle app source
COPY . .

# If 'ENV' build arg is available, use it here
ARG ENV="production"
ENV NODE_ENV=$ENV IS_DOCKER=true

# Install git, bash, and package dependencies
RUN apk update && apk upgrade && \
    apk add --no-cache bash git && \
    if [ "$ENV" == "development" ]; \
    then yarn install; \
    else yarn install --production; \
    fi

# Expose port
EXPOSE 3000

# Declare mount point
VOLUME /app/dist

CMD [ "yarn", "start" ]
