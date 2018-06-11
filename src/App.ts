import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import { apiRouter } from './routes';
import { expressLogger } from './imports';
type Application = express.Application;

/// Creates and configures an Express web server.
class App {
  /** Express app instance */
  public instance: Application;

  /** Configure Express instance */
  constructor() {
    this.instance = express();
    this.setup();
    this.middlewares();
    this.routes();
  }

  /** Configure Express settings */
  private setup() {
    this.instance.set('trust proxy', 'loopback');
  }

  /** Configure Express middleware */
  private middlewares() {
    this.instance.use(expressLogger);
    this.instance.use('/api/**/*', bodyParser.json());
    this.instance.use('/api/**/*', bodyParser.urlencoded({ extended: false }));
  }

  /** Configure API endpoints */
  private routes() {
    const staticDir = path.join(__dirname, '..', 'static');
    const indexDir = path.resolve(staticDir, 'index.html');

    // Configure API route
    this.instance.use('/api', apiRouter);

    // Configure to serve index and assets from static as a fallback mechanism
    this.instance.get('/', (req, res) => res.sendFile(indexDir));
    this.instance.use(express.static(staticDir));
  }

  /** Exports the App's internal Express instance */
  export = (): Application => this.instance;
}

export default App;
