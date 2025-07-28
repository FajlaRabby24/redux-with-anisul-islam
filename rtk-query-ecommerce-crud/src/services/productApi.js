import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3003/",
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    // getProducts
    getProducts: builder.query({
      query: () => "products",
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
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        {
          type: "product",
          id,
        },
      ],
    }), // update product
    updateProduct: builder.mutation({
      query: ({ id, updatedProduct }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: updatedProduct,
      }),
      invalidatesTags: (result, error, id) => [
        {
          type: "product",
          id,
        },
      ],
    }),
    // addProducts
    addProduct: builder.mutation({
      query: (body) => ({
        url: `products/`,
        method: "POST",
        body,
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
  useAddProductMutation,
  useUpdateProductMutation,
} = productApi;
