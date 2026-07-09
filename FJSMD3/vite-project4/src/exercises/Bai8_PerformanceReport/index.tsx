import { useFormik } from 'formik'
import { useForm } from 'react-hook-form'
import { getDiagnosticMatrix } from './diagnostics'

type FiveFields = {
  field1: string
  field2: string
  field3: string
  field4: string
  field5: string
}

const initialValues: FiveFields = {
  field1: '',
  field2: '',
  field3: '',
  field4: '',
  field5: '',
}

function FormikForm() {
  console.log('Rendered Component FormikForm')
  const formik = useFormik({ initialValues, onSubmit: () => undefined })

  return (
    <form className="grid gap-2">
      {Object.keys(initialValues).map((key) => (
        <input
          key={key}
          aria-label={`Formik ${key}`}
          name={key}
          value={formik.values[key as keyof FiveFields]}
          onChange={formik.handleChange}
          className="rounded-lg border border-slate-300 px-3 py-2"
        />
      ))}
    </form>
  )
}

function RHFForm() {
  console.log('Rendered Component RHFForm')
  const { register } = useForm<FiveFields>()

  return (
    <form className="grid gap-2">
      {Object.keys(initialValues).map((key) => (
        <input key={key} aria-label={`RHF ${key}`} {...register(key as keyof FiveFields)} className="rounded-lg border border-slate-300 px-3 py-2" />
      ))}
    </form>
  )
}

function Bai8PerformanceReport() {
  const matrix = getDiagnosticMatrix(10)

  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-emerald-700">Bài 8 - Performance Diagnostic</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">Formik vs React Hook Form</h3>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <FormikForm />
          <RHFForm />
        </div>
      </div>
      <aside className="rounded-lg border border-slate-200 bg-white p-5 text-sm shadow-sm">
        <h4 className="font-bold text-slate-950">Diagnostic Matrix cho 10 ký tự</h4>
        <table className="mt-3 w-full text-left">
          <thead><tr><th>Thư viện</th><th>Kiến trúc</th><th>Console log</th></tr></thead>
          <tbody>
            {matrix.map((row) => (
              <tr key={row.library} className="border-t">
                <td className="py-2">{row.library}</td>
                <td>{row.architecture}</td>
                <td>{row.renders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </aside>
    </section>
  )
}

export default Bai8PerformanceReport
