import { Request, Response } from 'express';
import {
  CustomRouter,
  puppiesLogger as logger,
  sendPrettyJSON
} from './imports';

class PuppyRouter extends CustomRouter {
  private hitCount = 0;

  constructor() {
    super();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get('/', this.getPuppies);
  }

  /**
   * Returns an `application/json` response that reflects the current
   *   state of the program.
   * Is an arrow function in order to capture `this` in its closure, so that
   *   it would register correctly in `registerRoutes`.
   */
  getPuppies = (req: Request, res: Response) => {
    this.hitCount += 1;
    const resObj = {
      messages: 'Puppies API was hit!',
      requestQuery: req.query,
      requestIP: req.ip,
      count: this.hitCount,
      NODE_ENV: process.env.NODE_ENV
    };
    // Log to Pino
    logger.info(resObj);
    // Send to client as prettified JSON
    sendPrettyJSON(res, resObj);
  };
}

export default PuppyRouter;
