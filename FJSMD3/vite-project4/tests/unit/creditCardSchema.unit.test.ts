import { describe, expect, it } from 'vitest'
import { creditCardSchema } from '../../src/exercises/Bai5_FormikYup/schema'

describe('Bài 5 credit card schema', () => {
  it('rejects invalid citizen id and income text', async () => {
    await expect(
      creditCardSchema.validate({ fullName: 'An', citizenId: '123', monthlyIncome: 'abc' }, { abortEarly: false }),
    ).rejects.toThrow()
  })

  it('accepts valid values', async () => {
    await expect(
      creditCardSchema.validate({ fullName: 'An Nguyen', citizenId: '012345678901', monthlyIncome: '6000000' }),
    ).resolves.toMatchObject({ fullName: 'An Nguyen' })
  })
})
