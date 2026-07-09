import { describe, expect, it } from 'vitest'
import { getDiagnosticMatrix } from '../../src/exercises/Bai8_PerformanceReport/diagnostics'

describe('Bài 8 diagnostic matrix', () => {
  it('reports expected render counts for 10 keystrokes', () => {
    expect(getDiagnosticMatrix(10)).toEqual([
      { library: 'Formik', architecture: 'Controlled', renders: 11 },
      { library: 'React Hook Form', architecture: 'Uncontrolled', renders: 1 },
    ])
  })
})
