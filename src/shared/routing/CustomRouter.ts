import { Router } from 'express';

abstract class CustomRouter {
  /** Internal initialized Express router */
  protected router: Router;

  /** Initialize Router upon construction */
  constructor() {
    this.router = Router();
  }

  /** Export internal router to be used as Express middleware */
  export = (): Router => this.router;
}

export default CustomRouter;
