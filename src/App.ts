import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import apiRouter from './routes/APIRouter';

/// Creates and configures an Express web server.
class App {
	/// Ref to Express instance
	public express: express.Application;

	/// Configure Express instance
	constructor() {
		this.express = express();
		this.setup();
		this.middleware();
		this.routes();
	}

	/// Configure Express settings
	private setup() {
		this.express.set('trust proxy', 'loopback');
	}

	/// Configure Express middleware
	private middleware() {
		if (process.env.NODE_ENV !== 'production') this.express.use(logger('dev'));
		this.express.use('/api/**/*', bodyParser.json());
		this.express.use('/api/**/*', bodyParser.urlencoded({ extended: false }));
	}

	/// Configure API endpoints
	private routes() {
		const distDir = path.join(__dirname, '..', 'dist');
		const index = path.resolve(distDir, 'index.html');

		// Configure API
		this.express.use('/api', apiRouter);

		// Configure Index
		this.express.use(express.static(distDir));
		this.express.get(
			/^(?!\/api).+$/, // Match all paths except '/api...'
			(req, res, next) => {
				// if (req.path.startsWith('/api')) { return next(); }
				res.sendFile(index);
			}
		);
	}
}

export default new App().express;
