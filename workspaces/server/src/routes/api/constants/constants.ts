import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

import { COMPANY } from '@wsh-2024/app/src/foundation/constants/Company';
import { CONTACT } from '@wsh-2024/app/src/foundation/constants/Contact';
import { OVERVIEW } from '@wsh-2024/app/src/foundation/constants/Overview';
import { QUESTION } from '@wsh-2024/app/src/foundation/constants/Question';
import { TERM } from '@wsh-2024/app/src/foundation/constants/Term';
import { GetConstantsRequestParamsSchema } from '@wsh-2024/schema/src/api/constants/GetConstantsRequestParams';

const app = new OpenAPIHono();

const route = createRoute({
  method: 'get',
  path: '/api/v1/constants/{constantsId}',
  request: {
    params: GetConstantsRequestParamsSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            text: z.string(),
          }),
        },
      },
      description: 'Get Constants',
    },
  },
  tags: ['[App] Constants API'],
});

app.openapi(route, async (c) => {
  const params = c.req.valid('param');
  switch (params.constantsId) {
    case 'company':
      return c.json({ text: COMPANY });
    case 'contact':
      return c.json({ text: CONTACT });
    case 'overview':
      return c.json({ text: OVERVIEW });
    case 'question':
      return c.json({ text: QUESTION });
    case 'term':
      return c.json({ text: TERM });
    default:
      throw new Error('Invalid constantsId');
  }
});

export { app as constantsApp };
