import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import { apiRouter } from './routes';
import { expressLogger } from './imports';

/// Creates and configures an Express web server.
class App {
  /// Express app instance
  public instance: express.Application;

  /// Configure Express instance
  constructor() {
    this.instance = express();
    this.setup();
    this.middlewares();
    this.routes();
  }

  /// Configure Express settings
  private setup() {
    this.instance.set('trust proxy', 'loopback');
  }

  /// Configure Express middleware
  private middlewares() {
    this.instance.use(expressLogger);
    this.instance.use('/api/**/*', bodyParser.json());
    this.instance.use('/api/**/*', bodyParser.urlencoded({ extended: false }));
  }

  /// Configure API endpoints
  private routes() {
    const distDir = path.join(__dirname, '..', 'dist');
    const index = path.resolve(distDir, 'index.html');

    // Configure API route
    this.instance.use('/api', apiRouter);

    // Configure to serve index and assets as a fallback mechanism
    this.instance.get('/', (req, res) => res.sendFile(index));
    this.instance.use(express.static(distDir));
  }
}

export default new App().instance;
