import { OpenAPIHono } from '@hono/zod-openapi';

import { constantsApp } from './constants';

const app = new OpenAPIHono();

app.route('/', constantsApp);

export { app as constantsApp };
