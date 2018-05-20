import { Response } from 'express';

function sendPrettyJSON(res: Response, obj: Object, spacing: number = 2) {
  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify(obj, null, spacing));
}

export { sendPrettyJSON };
