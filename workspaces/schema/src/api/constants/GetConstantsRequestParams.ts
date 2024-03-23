import { z } from 'zod';

export const GetConstantsRequestParamsSchema = z.object({
  constantsId: z.string(),
});

export type GetConstantsRequestParams = z.infer<typeof GetConstantsRequestParamsSchema>;
