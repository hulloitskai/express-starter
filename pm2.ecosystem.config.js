module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: "express-starter",
      script: "scripts/start.sh",
      watch: false,
      env: { NODE_ENV: "development" },
      env_production: { NODE_ENV: "production" }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  /*
  deploy: {
    production: {
      user: "%USER%", // i.e. dev
      host: "%HOST%", // i.e. 127.0.0.1
      ref: "origin/master", // Branch
      repo: "git@github.com:%USERNAME%/%REPOSITORY%.git",
      path: "%PATH_TO_APP%",
      "post-deploy": "npm install && npm run pm2",
    }
  }
  */
};
