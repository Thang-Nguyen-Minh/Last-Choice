import * as Yup from 'yup'

export type EmploymentStatus = 'employed' | 'seeking'

export type JobFormValues = {
  fullName: string
  employmentStatus: EmploymentStatus
  currentCompany: string
}

export const jobInitialValues: JobFormValues = {
  fullName: '',
  employmentStatus: 'seeking',
  currentCompany: '',
}

export const jobSchema = Yup.object({
  fullName: Yup.string().required('Họ tên là bắt buộc'),
  employmentStatus: Yup.string().oneOf(['employed', 'seeking']).required(),
  currentCompany: Yup.string().when('employmentStatus', {
    is: 'employed',
    then: (schema) => schema.required('Công ty hiện tại là bắt buộc'),
    otherwise: (schema) => schema.notRequired(),
  }),
})
