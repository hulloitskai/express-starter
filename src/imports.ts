import { routing, utils } from './shared';
import { pino } from './config';

// Import de-structuring
const { serverLogger, expressLogger } = pino;

// Re-exports
export { routing, utils, serverLogger, expressLogger };
