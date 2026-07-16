import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  createOrder,
  createProduct,
  deleteProduct,
  fetchPosts,
  fetchProducts,
  simulateServerError,
  togglePostLike,
  type OrderPayload,
  type OrderResult,
  type Post,
  type Product,
} from './mockData'

type ApiError = {
  status: number
  data: string
}

function toApiError(error: unknown, status = 500): ApiError {
  return {
    status,
    data: error instanceof Error ? error.message : 'Lỗi không xác định',
  }
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fakeBaseQuery<ApiError>(),
  tagTypes: ['Products', 'Posts'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], string | void>({
      async queryFn(keyword = '') {
        try {
          return { data: await fetchProducts(keyword ?? '') }
        } catch (error) {
          return { error: toApiError(error) }
        }
      },
      providesTags: (result) =>
        result
          ? [
              { type: 'Products' as const, id: 'LIST' },
              ...result.map((product) => ({ type: 'Products' as const, id: product.id })),
            ]
          : [{ type: 'Products' as const, id: 'LIST' }],
    }),
    getPosts: builder.query<Post[], void>({
      async queryFn() {
        try {
          return { data: await fetchPosts() }
        } catch (error) {
          return { error: toApiError(error) }
        }
      },
      providesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    toggleLike: builder.mutation<Post, { postId: string; shouldFail?: boolean }>({
      async queryFn({ postId, shouldFail }) {
        try {
          return { data: await togglePostLike(postId, shouldFail) }
        } catch (error) {
          return { error: toApiError(error) }
        }
      },
      async onQueryStarted({ postId }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          apiSlice.util.updateQueryData('getPosts', undefined, (draft) => {
            const post = draft.find((item) => item.id === postId)
            if (post) {
              post.liked = !post.liked
              post.likes += post.liked ? 1 : -1
            }
          }),
        )

        try {
          await queryFulfilled
        } catch {
          patch.undo()
        }
      },
    }),
    addProduct: builder.mutation<Product, { name: string; category: string; price: number; stock: number; shouldFail?: boolean }>({
      async queryFn({ shouldFail, ...input }) {
        try {
          return { data: await createProduct(input, shouldFail) }
        } catch (error) {
          return { error: toApiError(error) }
        }
      },
      invalidatesTags: (_result, error) => (error ? [] : [{ type: 'Products', id: 'LIST' }]),
    }),
    removeProduct: builder.mutation<{ ok: true; productId: string }, { productId: string; shouldFail?: boolean }>({
      async queryFn({ productId, shouldFail }) {
        try {
          return { data: await deleteProduct(productId, shouldFail) as { ok: true; productId: string } }
        } catch (error) {
          return { error: toApiError(error) }
        }
      },
      invalidatesTags: (_result, error) => (error ? [] : [{ type: 'Products', id: 'LIST' }]),
    }),
    simulateError: builder.query<{ ok: true }, void>({
      async queryFn() {
        try {
          await simulateServerError()
          return { data: { ok: true } }
        } catch (error) {
          return { error: toApiError(error, 500) }
        }
      },
    }),
    createOrder: builder.mutation<OrderResult, { payload: OrderPayload; shouldFail?: boolean }>({
      async queryFn({ payload, shouldFail }) {
        try {
          return { data: await createOrder(payload, shouldFail) }
        } catch (error) {
          return { error: toApiError(error) }
        }
      },
    }),
  }),
})

export const {
  useAddProductMutation,
  useCreateOrderMutation,
  useGetPostsQuery,
  useGetProductsQuery,
  useLazySimulateErrorQuery,
  useRemoveProductMutation,
  useToggleLikeMutation,
} = apiSlice
