import { Request, Response } from 'express';

import { puppiesLogger as logger, sendPrettyJSON, CustomRouter } from './imports';

class PuppyRouter extends CustomRouter {
  private hitCount = 0;

  registerRoutes() {
    this.router.get('/', this.getPuppies.bind(this));
  }

  getPuppies(req: Request, res: Response) {
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
  }
}

export default new PuppyRouter().export();
