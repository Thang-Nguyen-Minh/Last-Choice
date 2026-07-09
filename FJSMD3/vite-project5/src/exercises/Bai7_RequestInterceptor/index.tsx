import { useState } from 'react'
import { setAccessToken } from '../../api/authToken'
import { injectBearerToken } from '../../api/interceptorClient'

function Bai7RequestInterceptor() {
  const [header, setHeader] = useState('Chưa kiểm tra')

  function handleInject() {
    setAccessToken('demo-access-token')
    const config = injectBearerToken({ headers: {} } as Parameters<typeof injectBearerToken>[0])
    setHeader(String(config.headers.Authorization ?? 'Không có Authorization'))
  }

  function handleNoToken() {
    setAccessToken(null)
    const config = injectBearerToken({ headers: {} } as Parameters<typeof injectBearerToken>[0])
    setHeader(String(config.headers.Authorization ?? 'Không có Authorization'))
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-emerald-700">Bài 7 - Request Interceptor</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">Tự động tiêm Bearer Token</h3>
        <div className="mt-5 flex gap-2">
          <button type="button" onClick={handleInject} className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white">Có token</button>
          <button type="button" onClick={handleNoToken} className="rounded-lg bg-slate-700 px-3 py-2 text-sm font-semibold text-white">Không token</button>
        </div>
        <p className="mt-5 rounded-lg bg-slate-50 p-4 text-sm">Request Headers: {header}</p>
      </div>
      <aside className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 shadow-sm">
        <h4 className="font-bold">Bằng chứng header</h4>
        <p className="mt-2">Nút Có token mô phỏng ảnh chụp Request Headers: Authorization: Bearer demo-access-token.</p>
        <p className="mt-3">Không có token thì interceptor bỏ qua header, app không crash.</p>
      </aside>
    </section>
  )
}

export default Bai7RequestInterceptor
