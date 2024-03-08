import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const phoneBookAPI = createApi({
  reducerPath: 'phoneBookAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://62adab22645d00a28afd8efb.mockapi.io',
  }),

  endpoints: builder => ({
    getContacts: builder.query({
      query: () => `/contacts`,
      // providesTags: ['Contacts'],
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Contacts', id })), 'Contacts']
          : ['Contacts'],
    }),

    addContact: builder.mutation({
      query: newContact => ({
        url: `/contacts`,
        // When performing a mutation, you typically use a method of
        // PATCH/PUT/POST/DELETE for REST endpoints
        method: 'POST',
        // fetchBaseQuery automatically adds `content-type: application/json` to
        // the Headers and calls `JSON.stringify(patch)`
        body: newContact,
      }),

      // invalidatesTags: ['Contacts'],

      invalidatesTags: arg => [{ type: 'Contacts', id: arg.id }],
    }),

    removeContact: builder.mutation({
      query: id => ({
        url: `/contacts/${id}`,
        // When performing a mutation, you typically use a method of
        // PATCH/PUT/POST/DELETE for REST endpoints
        method: 'DELETE',
      }),

      // invalidatesTags: ['Contacts'],
      invalidatesTags: arg => [{ type: 'Contacts', id: arg.id }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetContactsQuery,
  useAddContactMutation,
  useRemoveContactMutation,
} = phoneBookAPI;
