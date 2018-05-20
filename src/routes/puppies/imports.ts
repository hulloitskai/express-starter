import { routesLogger, CustomRouter, utils } from '../imports';

const puppiesLogger = routesLogger.child({ name: 'server:routes:puppies' });
const { sendPrettyJSON } = utils.json_utils;

export { puppiesLogger, CustomRouter, sendPrettyJSON };
