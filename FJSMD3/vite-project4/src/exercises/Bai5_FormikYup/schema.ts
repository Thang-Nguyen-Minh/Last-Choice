import * as Yup from 'yup'

export type CreditCardFormValues = {
  fullName: string
  citizenId: string
  monthlyIncome: string
}

export const creditCardInitialValues: CreditCardFormValues = {
  fullName: '',
  citizenId: '',
  monthlyIncome: '',
}

export const creditCardSchema = Yup.object({
  fullName: Yup.string().trim().required('Họ tên là bắt buộc'),
  citizenId: Yup.string()
    .required('CCCD là bắt buộc')
    .matches(/^\d{12}$/, 'CCCD phải gồm đúng 12 chữ số'),
  monthlyIncome: Yup.number()
    .typeError('Thu nhập phải là số')
    .moreThan(5_000_000, 'Thu nhập phải lớn hơn 5.000.000')
    .required('Thu nhập là bắt buộc'),
})
