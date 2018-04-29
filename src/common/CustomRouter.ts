import { Router } from 'express';

export default abstract class CustomRouter {
	/// Internal initialized Express router
	protected router: Router;

	/// Initialize Router upon construction
	constructor() {
		this.router = Router();
		this.registerRoutes();
	}

	/// Register routes to be used by router
	abstract registerRoutes(): void;

	/// Export internal router to be used as Express middleware
	export(): Router {
		return this.router;
	}
}
