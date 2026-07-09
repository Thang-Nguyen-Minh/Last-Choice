import { useFormik } from 'formik'
import { useState } from 'react'
import { creditCardInitialValues, creditCardSchema, type CreditCardFormValues } from './schema'

function Bai5FormikYup() {
  const [submitted, setSubmitted] = useState<CreditCardFormValues | null>(null)
  const formik = useFormik({
    initialValues: creditCardInitialValues,
    validationSchema: creditCardSchema,
    onSubmit: (values) => setSubmitted(values),
  })

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_400px]">
      <form onSubmit={formik.handleSubmit} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-emerald-700">Bài 5 - Formik & Yup</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">Mở thẻ tín dụng trực tuyến</h3>
        {[
          ['fullName', 'Họ tên'],
          ['citizenId', 'CCCD'],
          ['monthlyIncome', 'Thu nhập hàng tháng'],
        ].map(([name, label]) => (
          <label key={name} className="mt-5 grid gap-2 text-sm font-semibold text-slate-800">
            {label}
            <input
              name={name}
              aria-label={label}
              value={formik.values[name as keyof CreditCardFormValues]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="rounded-lg border border-slate-300 px-3 py-2 font-normal"
            />
            {formik.touched[name as keyof CreditCardFormValues] && formik.errors[name as keyof CreditCardFormValues] ? (
              <span role="alert" className="text-sm text-rose-700">
                {formik.errors[name as keyof CreditCardFormValues]}
              </span>
            ) : null}
          </label>
        ))}
        <button type="submit" className="mt-6 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">
          Gửi hồ sơ
        </button>
        {submitted ? <p className="mt-4 text-sm font-semibold text-emerald-700">Đã nhận hồ sơ: {submitted.fullName}</p> : null}
      </form>
      <aside className="rounded-lg border border-sky-200 bg-sky-50 p-5 text-sm leading-6 text-sky-950">
        <h4 className="font-bold">Luồng dữ liệu</h4>
        <p className="mt-2">Input: họ tên, CCCD, thu nhập. Yup kiểm lỗi required, regex 12 số, number và thu nhập &gt; 5.000.000.</p>
        <p className="mt-3">Output: onSubmit trả object hồ sơ hợp lệ.</p>
      </aside>
    </section>
  )
}

export default Bai5FormikYup
