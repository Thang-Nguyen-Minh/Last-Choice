import { useState } from 'react'
import { useForm } from 'react-hook-form'

type BlogFormValues = {
  title: string
  content: string
}

function Bai6RhfUncontrolled() {
  const [submitted, setSubmitted] = useState<BlogFormValues | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogFormValues>()

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_400px]">
      <form onSubmit={handleSubmit(setSubmitted)} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-emerald-700">Bài 6 - React Hook Form</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">Soạn thảo bài viết Blog</h3>
        <label className="mt-5 grid gap-2 text-sm font-semibold">
          Tiêu đề
          <input {...register('title', { required: true })} className="rounded-lg border border-slate-300 px-3 py-2 font-normal" />
          {errors.title ? <span role="alert" className="text-sm text-rose-700">Tiêu đề là bắt buộc</span> : null}
        </label>
        <label className="mt-5 grid gap-2 text-sm font-semibold">
          Nội dung
          <textarea
            {...register('content', { required: true, minLength: 50 })}
            rows={7}
            className="rounded-lg border border-slate-300 px-3 py-2 font-normal"
          />
          {errors.content ? <span role="alert" className="text-sm text-rose-700">Nội dung tối thiểu 50 ký tự</span> : null}
        </label>
        <button type="submit" className="mt-6 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">
          Lưu bài viết
        </button>
        {submitted ? <p className="mt-4 text-sm font-semibold text-emerald-700">Đã lưu: {submitted.title}</p> : null}
      </form>
      <aside className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-700 shadow-sm">
        <h4 className="font-bold text-slate-950">Uncontrolled Component</h4>
        <p className="mt-2">Input không truyền value/onChange. React Hook Form register trực tiếp DOM ref và đọc dữ liệu khi submit.</p>
      </aside>
    </section>
  )
}

export default Bai6RhfUncontrolled
