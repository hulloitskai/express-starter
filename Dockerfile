FROM node:9.11.1-alpine
MAINTAINER Steven Xie <dev@stevenxie.me>

# Install git and bash
RUN apk update && apk upgrade && \
    apk add --no-cache bash git

# Create app directory
WORKDIR /app

# Bundle app source
COPY . .

# If 'ENV' build arg is available, use it here
ARG ENV="production";

# Set environment variables
ENV NODE_ENV=$ENV IS_DOCKER=true

# Install dependencies
RUN if [ "$ENV" == "development" ]; \
    then yarn install; \
    else yarn install --production; \
    fi

# Expose port
EXPOSE 3000

CMD [ "yarn", "start" ]
