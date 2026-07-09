import AxiosMockAdapter from 'axios-mock-adapter'
import { afterEach, describe, expect, it } from 'vitest'
import { setAccessToken } from '../../src/api/authToken'
import { ApiClient, cleanParams, createResilientAxiosInstance } from '../../src/api/resilientClient'

const instance = createResilientAxiosInstance()
const mock = new AxiosMockAdapter(instance)
const client = new ApiClient(instance)

describe('Bài 10 resilient API client', () => {
  afterEach(() => mock.reset())

  it('cleans invalid params before GET', async () => {
    mock.onGet('/contacts').reply((config) => [200, config.params])

    await expect(client.get('/contacts', { q: 'a', empty: '', page: undefined })).resolves.toEqual({ q: 'a' })
    expect(cleanParams(undefined)).toBeUndefined()
  })

  it('injects token and normalizes server errors', async () => {
    setAccessToken('token')
    mock.onPost('/contacts').reply((config) => [200, { auth: config.headers?.Authorization }])
    await expect(client.post('/contacts', {})).resolves.toEqual({ auth: 'Bearer token' })

    mock.onGet('/broken').reply(500)
    await expect(client.get('/broken')).rejects.toMatchObject({ status: 500, message: 'Máy chủ gặp lỗi' })
  })
})
