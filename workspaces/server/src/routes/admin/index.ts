import fs from 'node:fs/promises';

import { Hono } from 'hono';

import { INDEX_HTML_PATH } from '../../constants/paths';
import { cacheControlMiddlewareNoStore } from '../../middlewares/cacheControlMiddleware';

const app = new Hono();

app.use('/admin', cacheControlMiddlewareNoStore);
app.get('/admin', async (c) => {
  const htmlContent = await fs.readFile(INDEX_HTML_PATH, 'utf-8');
  const html = htmlContent.replaceAll(
    '<script id="client-js" type="text/javascript"></script>',
    '<script type="text/javascript" src="/admin.global.js" defer></script>',
  );
  return c.html(html);
});

app.use('/admin/*', cacheControlMiddlewareNoStore);
app.get('/admin/*', async (c) => {
  const htmlContent = await fs.readFile(INDEX_HTML_PATH, 'utf-8');
  const html = htmlContent.replaceAll(
    '<script id="client-js" type="text/javascript"></script>',
    '<script type="text/javascript" src="/admin.global.js" defer></script>',
  );
  return c.html(html);
});

export { app as adminApp };
