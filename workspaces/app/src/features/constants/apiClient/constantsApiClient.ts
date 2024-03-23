import { inject } from 'regexparam';

import type { GetConstantsRequestParams } from '@wsh-2024/schema/src/api/constants/GetConstantsRequestParams';

import type { DomainSpecificApiClientInterface } from '../../../lib/api/DomainSpecificApiClientInterface';
import { apiClient } from '../../../lib/api/apiClient';

type ConstantsApiClient = DomainSpecificApiClientInterface<{
  fetch: [{ params: GetConstantsRequestParams }, {text: string}];
}>;

export const constantsApiClient: ConstantsApiClient = {
  fetch: async ({ params }) => {
    const response = await apiClient.get<{text: string}>(inject('/api/v1/constants/:constantsId', params));
    return response.data;
  },
  fetch$$key: (options) => ({
    requestUrl: `/api/v1/constants/:constantsId`,
    ...options,
  }),
};
