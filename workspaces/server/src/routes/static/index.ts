import path from 'node:path';

import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';

import { CLIENT_STATIC_PATH } from '../../constants/paths';
import { cacheControlMiddlewarePublic } from '../../middlewares/cacheControlMiddleware';
import { compressMiddleware } from '../../middlewares/compressMiddleware';

const app = new Hono();

app.use(
  '*',
  serveStatic({
    root: path.relative(process.cwd(), CLIENT_STATIC_PATH),
  }),
  compressMiddleware,
  cacheControlMiddlewarePublic,
);

export { app as staticApp };
