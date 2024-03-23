import { createMiddleware } from 'hono/factory';

export const cacheControlMiddlewareNoStore = createMiddleware(async (c, next) => {
  await next();
  c.res.headers.append('Cache-Control', 'no-store');
});

export const cacheControlMiddlewarePublic = createMiddleware(async (c, next) => {
  await next();
  c.res.headers.append('Cache-Control', 'public, max-age=7200, immutable');
});
