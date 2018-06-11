import { pino } from './config';
import { routing, utils } from './shared';

// Import de-structuring
const { serverLogger, expressLogger } = pino;

// Re-exports
export { routing, utils, serverLogger, expressLogger };
