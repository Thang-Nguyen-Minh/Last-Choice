import { attachAuthHeader } from '../../api/axiosSimulator'
import { useBoundStore } from '../../stores/boundStore'

function Bai9ZustandSlices() {
  const token = useBoundStore((state) => state.auth.token)
  const login = useBoundStore((state) => state.auth.login)
  const logout = useBoundStore((state) => state.auth.logout)
  const toast = useBoundStore((state) => state.ui.toast)
  const showToast = useBoundStore((state) => state.ui.showToast)
  const clearToast = useBoundStore((state) => state.ui.clearToast)
  const requestConfig = attachAuthHeader({ url: '/api/orders' })

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-emerald-700">Bài 9 - Zustand Slices & Vanilla JS</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">Bound Store cho Auth và UI</h3>

        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" onClick={() => login('jwt-demo-token')} className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white">
            Đăng nhập
          </button>
          <button type="button" onClick={logout} className="rounded-lg bg-rose-700 px-3 py-2 text-sm font-semibold text-white">
            Đăng xuất
          </button>
          <button type="button" onClick={() => showToast('Lưu thành công')} className="rounded-lg bg-sky-700 px-3 py-2 text-sm font-semibold text-white">
            Hiện toast
          </button>
          <button type="button" onClick={clearToast} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold">
            Xóa toast
          </button>
        </div>

        <div className="mt-5 rounded-lg bg-slate-50 p-4 text-sm leading-6">
          <p>Token: {token ?? 'null'}</p>
          <p>Toast: {toast ?? 'null'}</p>
          <p>Authorization header: {requestConfig.headers?.Authorization ?? 'Không gắn header'}</p>
        </div>
      </div>

      <aside className="rounded-lg border border-indigo-200 bg-indigo-50 p-5 text-sm leading-6 text-indigo-950">
        <h4 className="font-bold">Slices Pattern</h4>
        <p className="mt-2">authSlice lưu JWT token, uiSlice lưu toast/modal. Bound store gom hai slice thành một store.</p>
        <p className="mt-3">File ngoài React như Axios interceptor dùng useBoundStore.getState(), không dùng hook.</p>
        <p className="mt-3">Nếu token null sau logout, interceptor không gắn Authorization header.</p>
      </aside>
    </section>
  )
}

export default Bai9ZustandSlices
