import * as Yup from 'yup'

export type GradeFormValues = {
  courseCode: string
  studentCount: number
  scores: Array<{ value: number }>
}

export const gradeSchema = Yup.object({
  courseCode: Yup.string().matches(/^[A-Z]+[0-9]*$/, 'Mã môn học phải là chữ in hoa').required('Mã môn học là bắt buộc'),
  studentCount: Yup.number().typeError('Sĩ số phải là số').integer('Sĩ số phải là số nguyên').moreThan(0, 'Sĩ số không hợp lệ').required('Sĩ số là bắt buộc'),
  scores: Yup.array().of(
    Yup.object({
      value: Yup.number().typeError('Điểm phải là số').min(0, 'Điểm phải từ 0.0 đến 10.0').max(10, 'Điểm phải từ 0.0 đến 10.0').required('Điểm là bắt buộc'),
    }),
  ).required(),
})

export function buildScoreRows(count: number) {
  return Array.from({ length: Math.max(0, count) }, () => ({ value: 0 }))
}
