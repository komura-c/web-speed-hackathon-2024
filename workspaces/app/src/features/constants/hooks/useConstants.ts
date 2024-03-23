import useSWR from 'swr';

import { constantsApiClient } from '../apiClient/constantsApiClient';

export function useConstants(...[options]: Parameters<typeof constantsApiClient.fetch>) {
  return useSWR(constantsApiClient.fetch$$key(options), constantsApiClient.fetch, { suspense: true });
}
