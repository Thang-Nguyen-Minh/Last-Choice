import { AxiosError } from 'axios'
import { useState } from 'react'
import { handleGlobalApiError, setAuthRedirectHandler } from '../../api/globalErrorClient'

function Bai8GlobalErrorHandling() {
  const [route, setRoute] = useState('/dashboard')

  async function simulate401() {
    setAuthRedirectHandler(setRoute)
    const error = new AxiosError('Unauthorized', 'ERR_BAD_REQUEST', undefined, undefined, {
      status: 401,
      statusText: 'Unauthorized',
      headers: {},
      config: {} as never,
      data: {},
    })
    await handleGlobalApiError(error).catch(() => undefined)
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_440px]">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-emerald-700">Bài 8 - Global Error Handling</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">Response Interceptor bắt lỗi 401</h3>
        <p className="mt-5 rounded-lg bg-slate-50 p-4 text-sm">Route hiện tại: {route}</p>
        <button type="button" onClick={simulate401} className="mt-4 rounded-lg bg-rose-700 px-3 py-2 text-sm font-semibold text-white">Mô phỏng 401</button>
      </div>
      <aside className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 shadow-sm">
        <h4 className="font-bold">Tập trung vs phân tán</h4>
        <p className="mt-2">Interceptor tập trung: dễ bảo trì, không lặp catch 401 ở hàng chục API.</p>
        <p className="mt-3">Catch phân tán: linh hoạt từng màn nhưng lặp code và dễ sót case logout.</p>
      </aside>
    </section>
  )
}

export default Bai8GlobalErrorHandling
