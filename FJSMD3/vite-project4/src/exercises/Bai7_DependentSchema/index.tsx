import { useFormik } from 'formik'
import { useState } from 'react'
import { jobInitialValues, jobSchema, type JobFormValues } from './schema'

function Bai7DependentSchema() {
  const [submitted, setSubmitted] = useState<JobFormValues | null>(null)
  const formik = useFormik({
    initialValues: jobInitialValues,
    validationSchema: jobSchema,
    onSubmit: (values) => setSubmitted(values),
  })
  const isEmployed = formik.values.employmentStatus === 'employed'

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_440px]">
      <form onSubmit={formik.handleSubmit} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-emerald-700">Bài 7 - Yup .when()</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">Form ứng viên</h3>
        <label className="mt-5 grid gap-2 text-sm font-semibold">
          Họ tên
          <input aria-label="Họ tên" name="fullName" value={formik.values.fullName} onChange={formik.handleChange} className="rounded-lg border border-slate-300 px-3 py-2 font-normal" />
        </label>
        <label className="mt-5 grid gap-2 text-sm font-semibold">
          Trạng thái việc làm
          <select aria-label="Trạng thái việc làm" name="employmentStatus" value={formik.values.employmentStatus} onChange={formik.handleChange} className="rounded-lg border border-slate-300 px-3 py-2 font-normal">
            <option value="seeking">Đang tìm việc</option>
            <option value="employed">Đã có việc</option>
          </select>
        </label>
        {isEmployed ? (
          <label className="mt-5 grid gap-2 text-sm font-semibold">
            Công ty hiện tại
            <input aria-label="Công ty hiện tại" name="currentCompany" value={formik.values.currentCompany} onChange={formik.handleChange} className="rounded-lg border border-slate-300 px-3 py-2 font-normal" />
            {formik.errors.currentCompany ? <span role="alert" className="text-sm text-rose-700">{formik.errors.currentCompany}</span> : null}
          </label>
        ) : null}
        <button type="submit" className="mt-6 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">
          Nộp hồ sơ
        </button>
        {submitted ? <p className="mt-4 text-sm font-semibold text-emerald-700">Đã nộp: {submitted.fullName}</p> : null}
      </form>
      <aside className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
        <h4 className="font-bold">Hai giải pháp</h4>
        <p className="mt-2">1. Tự viết validate thủ công: linh hoạt nhưng dễ lặp logic.</p>
        <p className="mt-3">2. Yup .when(): schema phụ thuộc trực tiếp vào employmentStatus, ít code và dễ đọc. Chọn .when().</p>
      </aside>
    </section>
  )
}

export default Bai7DependentSchema
