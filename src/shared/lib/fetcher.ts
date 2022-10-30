import ky from 'ky';

import {userModel} from 'entities';

import {ApiError} from './errors';

// @ts-ignore // eslint-disable-next-line
const apiUrl = import.meta.env?.VITE_API_URL || '/missing-api-url-in-env/';

export const fetcher = ky.extend({
  prefixUrl: apiUrl,
  hooks: {
    beforeRequest: [
      (request) => {
        if (userModel.token) {
          request.headers.set('Authorization', `Bearer ${userModel.token}`);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          userModel.removeToken();
        }

        if (!response.ok) {
          const body = await response.json();

          throw new ApiError({...body.error, status: response.status});
        }
      },
    ],
  },
});
