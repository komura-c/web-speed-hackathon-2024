import path from 'node:path';

import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';

import { CLIENT_STATIC_PATH } from '../../constants/paths';
import { cacheControlMiddlewarePublic } from '../../middlewares/cacheControlMiddleware';

const app = new Hono();

app.use(
  '/assets/*',
  cacheControlMiddlewarePublic,
);
app.use(
  '/*.js',
  cacheControlMiddlewarePublic,
);
app.use(
  '/*.json',
  cacheControlMiddlewarePublic,
);

app.use(
  '*',
  serveStatic({
    root: path.relative(process.cwd(), CLIENT_STATIC_PATH),
  }),
);

export { app as staticApp };
