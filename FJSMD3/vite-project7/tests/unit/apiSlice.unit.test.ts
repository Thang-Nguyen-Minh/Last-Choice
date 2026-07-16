import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { makeStore } from '../../src/app/store'
import { pushToast } from '../../src/features/toast/toastSlice'
import { apiSlice } from '../../src/services/apiSlice'
import { resetMockData } from '../../src/services/mockData'

describe('RTK Query API slice', () => {
  beforeEach(() => resetMockData())
  afterEach(() => apiSlice.util.resetApiState())

  it('filters products by keyword', async () => {
    const store = makeStore()
    const result = await store.dispatch(apiSlice.endpoints.getProducts.initiate('Laptop')).unwrap()

    expect(result.every((product) => product.name.includes('Laptop') || product.category.includes('Laptop'))).toBe(true)
  })

  it('optimistically rolls back Like when mutation fails', async () => {
    const store = makeStore()
    await store.dispatch(apiSlice.endpoints.getPosts.initiate()).unwrap()

    await expect(store.dispatch(apiSlice.endpoints.toggleLike.initiate({ postId: 'post-1', shouldFail: true })).unwrap()).rejects.toBeTruthy()

    const posts = apiSlice.endpoints.getPosts.select()(store.getState()).data
    expect(posts?.[0]).toMatchObject({ liked: false, likes: 12 })
  })

  it('global middleware converts rejected RTK Query actions into toasts', async () => {
    const store = makeStore()

    await expect(store.dispatch(apiSlice.endpoints.simulateError.initiate()).unwrap()).rejects.toBeTruthy()

    expect(store.getState().toast.items[0]?.message).toContain('Lỗi 500')
  })

  it('toast slice can receive manual success messages', () => {
    const store = makeStore()
    store.dispatch(pushToast({ type: 'success', message: 'OK' }))

    expect(store.getState().toast.items[0]).toMatchObject({ type: 'success', message: 'OK' })
  })
})
