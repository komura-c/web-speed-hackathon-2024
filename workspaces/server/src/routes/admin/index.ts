import fs from 'node:fs/promises';

import { Hono } from 'hono';

import { INDEX_HTML_PATH } from '../../constants/paths';
import { cacheControlMiddlewareNoStore } from '../../middlewares/cacheControlMiddleware';

const app = new Hono();

app.use('/admin', cacheControlMiddlewareNoStore);
app.get('/admin', async (c) => {
  const html = await fs.readFile(INDEX_HTML_PATH, 'utf-8');
  return c.html(html);
});

app.use('/admin/*', cacheControlMiddlewareNoStore);
app.get('/admin/*', async (c) => {
  const html = await fs.readFile(INDEX_HTML_PATH, 'utf-8');
  return c.html(html);
});

export { app as adminApp };
