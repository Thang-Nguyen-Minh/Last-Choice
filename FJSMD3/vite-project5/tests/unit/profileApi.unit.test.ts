import AxiosMockAdapter from 'axios-mock-adapter'
import { afterEach, describe, expect, it } from 'vitest'
import { explainPutMissingFieldsRisk, profileClient, replaceUserProfile, sampleUser, updateUserPhone } from '../../src/api/profileApi'

const mock = new AxiosMockAdapter(profileClient)

describe('Bài 6 PUT vs PATCH API', () => {
  afterEach(() => mock.reset())

  it('sends full payload for PUT and partial payload for PATCH', async () => {
    mock.onPut('/users/1').reply((config) => [200, JSON.parse(config.data)])
    mock.onPatch('/users/1').reply((config) => [200, { ...sampleUser, ...JSON.parse(config.data) }])

    await replaceUserProfile(sampleUser)
    expect(JSON.parse(mock.history.put[0].data)).toEqual(sampleUser)

    await updateUserPhone('1', { phone: '0912345678' })
    expect(JSON.parse(mock.history.patch[0].data)).toEqual({ phone: '0912345678' })
    expect(explainPutMissingFieldsRisk()).toContain('mất dữ liệu')
  })
})
