import { describe, expect, it } from 'vitest'
import { jobSchema } from '../../src/exercises/Bai7_DependentSchema/schema'

describe('Bài 7 dependent schema', () => {
  it('requires current company only when employed', async () => {
    await expect(jobSchema.validate({ fullName: 'Lan', employmentStatus: 'employed', currentCompany: '' })).rejects.toThrow(
      'Công ty hiện tại là bắt buộc',
    )
    await expect(jobSchema.validate({ fullName: 'Lan', employmentStatus: 'seeking', currentCompany: '' })).resolves.toBeTruthy()
  })
})
