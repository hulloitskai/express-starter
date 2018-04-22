import CustomRouter from "../common/CustomRouter";
import { sendPrettyJSON } from "../common/JSONUtils";
import { Request, Response } from "express";
import debug = require("debug");

class PuppyRouter extends CustomRouter {
  private hitCount = 0;

  registerRoutes() {
    this.router.get("/", this.getPuppies.bind(this));
  }

  getPuppies(req: Request, res: Response) {
    debug("server:api:puppies")("HIT!");
    this.hitCount += 1;
    sendPrettyJSON(res, {
      messages: "Puppies API was hit!",
      requestQuery: req.query,
      requestIP: req.ip,
      count: this.hitCount,
      NODE_ENV: process.env.NODE_ENV
    });
  }
}

export default new PuppyRouter().export();
