import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

type BudgetFormValues = {
  items: Array<{ name: string; price: number }>
}

function Bai9DynamicFields() {
  const [submitted, setSubmitted] = useState<BudgetFormValues | null>(null)
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BudgetFormValues>({
    defaultValues: { items: [{ name: '', price: 0 }] },
  })
  const { fields, append, remove } = useFieldArray({ control, name: 'items', rules: { minLength: 1 } })

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_400px]">
      <form onSubmit={handleSubmit(setSubmitted)} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-emerald-700">Bài 9 - Dynamic Fields</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">Lập kế hoạch chi tiêu</h3>
        <div className="mt-5 grid gap-3">
          {fields.map((field, index) => (
            <div key={field.id} className="grid gap-2 rounded-lg border border-slate-200 p-3 md:grid-cols-[1fr_140px_auto]">
              <input aria-label={`Tên món ${index + 1}`} {...register(`items.${index}.name`, { required: true })} placeholder="Tên món đồ" className="rounded-lg border border-slate-300 px-3 py-2" />
              <input aria-label={`Giá món ${index + 1}`} type="number" {...register(`items.${index}.price`, { valueAsNumber: true, min: 1 })} className="rounded-lg border border-slate-300 px-3 py-2" />
              <button type="button" onClick={() => remove(index)} className="rounded-lg bg-rose-700 px-3 py-2 text-sm font-semibold text-white">Xóa</button>
            </div>
          ))}
        </div>
        {errors.items?.root ? <p role="alert" className="mt-3 text-sm text-rose-700">Phải có ít nhất 1 món đồ</p> : null}
        <button type="button" onClick={() => append({ name: '', price: 0 })} className="mt-5 rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white">Thêm món đồ</button>
        <button type="submit" className="ml-2 mt-5 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">Lưu kế hoạch</button>
        {submitted ? <pre className="mt-4 rounded-lg bg-slate-50 p-3 text-xs">{JSON.stringify(submitted, null, 2)}</pre> : null}
      </form>
      <aside className="rounded-lg border border-sky-200 bg-sky-50 p-5 text-sm leading-6 text-sky-950">
        <h4 className="font-bold">State danh sách động</h4>
        <p className="mt-2">useFieldArray giữ danh sách fields ổn định bằng id. register dùng cú pháp index như items.0.name.</p>
      </aside>
    </section>
  )
}

export default Bai9DynamicFields
