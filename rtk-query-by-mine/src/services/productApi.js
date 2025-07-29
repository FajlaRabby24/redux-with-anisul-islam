import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3003",
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    // getProducts
    getProducts: builder.query({
      query: () => "/products",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "product", id })),
              { type: "product", id: "LIST" },
            ]
          : [{ type: "product", id: "LIST" }],
    }),
    // deleteProducts
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        {
          type: "product",
          id,
        },
      ],
    }),
    // updateProducts
    updateProducts: builder.mutation({
      query: ({ id, updatedProducts }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...updatedProducts,
        }),
      }),
      invalidatesTags: (result, error, id) => [
        {
          type: "product",
          id,
        },
      ],
    }),
    // create products
    createProducts: builder.mutation({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: [
        {
          type: "product",
          id: "LIST",
        },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useDeleteProductMutation,
  useUpdateProductsMutation,
  useCreateProductsMutation,
} = productApi;
