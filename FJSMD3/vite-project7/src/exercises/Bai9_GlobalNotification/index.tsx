import { useLazySimulateErrorQuery } from '../../services/apiSlice'
import ToastViewport from './ToastViewport'

function Bai9GlobalNotification() {
  const [triggerError, { isFetching }] = useLazySimulateErrorQuery()

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <ToastViewport />
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-emerald-700">Bài 9 - Global Error Middleware</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">Mini Notification tự bắt API lỗi</h3>

        <button
          type="button"
          onClick={() => void triggerError()}
          className="mt-5 rounded-lg bg-rose-700 px-4 py-2 text-sm font-semibold text-white"
        >
          {isFetching ? 'Đang gọi API lỗi...' : 'Gọi API lỗi 500'}
        </button>

        <p className="mt-4 text-sm text-slate-600">
          Component không tự dispatch toast. Middleware ở tầng store nghe RTK Query rejected action rồi tự đẩy thông báo.
        </p>
      </div>

      <aside className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-sm leading-6 text-emerald-950">
        <h4 className="font-bold">Custom middleware</h4>
        <p className="mt-2">Dùng `isRejectedWithValue(action)` để nhận mọi action lỗi từ RTK Query.</p>
        <p className="mt-3">Sau đó middleware dispatch `pushToast`, nên component API không cần lặp lại code catch/toast.</p>
      </aside>
    </section>
  )
}

export default Bai9GlobalNotification
