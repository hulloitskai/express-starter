import { serverLogger, routing, utils } from '../imports';

// Import de-structuring
const { default: CustomRouter } = routing.custom_router;
const routesLogger = serverLogger.child({ name: 'server:routes' });

// Re-exports
export { routesLogger, CustomRouter, utils };
