import { AxiosError } from 'axios'
import { describe, expect, it, vi } from 'vitest'
import { setAccessToken } from '../../src/api/authToken'
import { handleGlobalApiError, setAuthRedirectHandler } from '../../src/api/globalErrorClient'
import { injectBearerToken } from '../../src/api/interceptorClient'

describe('Bài 7-8 interceptors', () => {
  it('injects token only when available', () => {
    setAccessToken('abc')
    const withToken = injectBearerToken({ headers: {} } as Parameters<typeof injectBearerToken>[0])
    expect(withToken.headers.Authorization).toBe('Bearer abc')

    setAccessToken(null)
    const withoutToken = injectBearerToken({ headers: {} } as Parameters<typeof injectBearerToken>[0])
    expect(withoutToken.headers.Authorization).toBeUndefined()
  })

  it('redirects on 401 response errors', async () => {
    const redirect = vi.fn()
    setAuthRedirectHandler(redirect)
    const error = new AxiosError('Unauthorized', 'ERR', undefined, undefined, {
      status: 401,
      statusText: 'Unauthorized',
      headers: {},
      config: {} as never,
      data: {},
    })

    await handleGlobalApiError(error).catch(() => undefined)
    expect(redirect).toHaveBeenCalledWith('/login')
  })
})
