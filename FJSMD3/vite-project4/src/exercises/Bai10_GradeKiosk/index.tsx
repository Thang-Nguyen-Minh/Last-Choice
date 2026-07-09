import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { buildScoreRows, gradeSchema, type GradeFormValues } from './schema'

function Bai10GradeKiosk() {
  const [submitted, setSubmitted] = useState<GradeFormValues | null>(null)
  const {
    register,
    control,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<GradeFormValues>({
    defaultValues: { courseCode: '', studentCount: 0, scores: [] },
    resolver: yupResolver(gradeSchema),
  })
  const { fields, replace } = useFieldArray({ control, name: 'scores' })
  const watchedStudentCount = useWatch({ control, name: 'studentCount' })
  const studentCount = Number(watchedStudentCount)
  const isInvalidCount = !Number.isFinite(studentCount) || studentCount <= 0

  useEffect(() => {
    if (isInvalidCount) {
      replace([])
      resetField('scores')
      return
    }
    replace(buildScoreRows(studentCount))
  }, [isInvalidCount, replace, resetField, studentCount])

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <form onSubmit={handleSubmit(setSubmitted)} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-emerald-700">Bài 10 - LMS Grade Kiosk</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">Vào điểm cuối kỳ</h3>
        <label className="mt-5 grid gap-2 text-sm font-semibold">Mã môn học
          <input aria-label="Mã môn học" {...register('courseCode')} className="rounded-lg border border-slate-300 px-3 py-2 font-normal" />
          {errors.courseCode ? <span role="alert" className="text-sm text-rose-700">{errors.courseCode.message}</span> : null}
        </label>
        <label className="mt-5 grid gap-2 text-sm font-semibold">Sĩ số
          <input aria-label="Sĩ số" type="number" {...register('studentCount', { valueAsNumber: true })} className="rounded-lg border border-slate-300 px-3 py-2 font-normal" />
          {(errors.studentCount || isInvalidCount) ? <span role="alert" className="text-sm text-rose-700">Sĩ số không hợp lệ</span> : null}
        </label>
        <div className="mt-5 grid gap-2">
          {fields.map((field, index) => (
            <label key={field.id} className="grid gap-1 text-sm font-semibold">Điểm sinh viên {index + 1}
              <input aria-label={`Điểm sinh viên ${index + 1}`} type="number" step="0.1" {...register(`scores.${index}.value`, { valueAsNumber: true })} className="rounded-lg border border-slate-300 px-3 py-2 font-normal" />
              {errors.scores?.[index]?.value ? <span role="alert" className="text-sm text-rose-700">{errors.scores[index]?.value?.message}</span> : null}
            </label>
          ))}
        </div>
        <button type="submit" className="mt-6 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">Lưu điểm</button>
        {submitted ? <p className="mt-4 text-sm font-semibold text-emerald-700">Đã lưu {submitted.scores.length} điểm cho {submitted.courseCode}</p> : null}
      </form>
      <aside className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 shadow-sm">
        <h4 className="font-bold text-slate-950">Lưu đồ tương tác</h4>
        <p className="mt-2">Nhập sĩ số -&gt; nếu &lt;= 0 khóa mảng điểm -&gt; nếu hợp lệ render đúng số input -&gt; Yup resolver kiểm điểm 0.0 đến 10.0 -&gt; submit.</p>
      </aside>
    </section>
  )
}

export default Bai10GradeKiosk
