import { cleanParams, coveredExceptionScenarios } from '../../api/resilientClient'

function Bai10ResilientClient() {
  const cleaned = cleanParams({ q: 'contact', page: undefined, empty: '', active: true })

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-emerald-700">Bài 10 - Resilient API Client</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">Module mạng kháng lỗi</h3>
        <pre className="mt-5 rounded-lg bg-slate-50 p-4 text-xs">{JSON.stringify(cleaned, null, 2)}</pre>
        <p className="mt-3 text-sm text-slate-600">Axios instance có timeout 5000ms, request/response interceptors và hàm get/post/put/remove.</p>
      </div>
      <aside className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 shadow-sm">
        <h4 className="font-bold">Ngoại lệ đã bao phủ</h4>
        <ul className="mt-3 grid gap-2">
          {coveredExceptionScenarios.map((item) => <li key={item}>- {item}</li>)}
        </ul>
      </aside>
    </section>
  )
}

export default Bai10ResilientClient
