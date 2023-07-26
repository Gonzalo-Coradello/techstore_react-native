import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL_FIREBASE_REALTIME_DATABASE } from '../../../constants/firebase';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_FIREBASE_REALTIME_DATABASE }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => '/categories.json',
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
