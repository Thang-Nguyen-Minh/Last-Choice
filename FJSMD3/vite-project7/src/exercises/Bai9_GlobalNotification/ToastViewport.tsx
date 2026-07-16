import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { removeToast } from '../../features/toast/toastSlice'

function ToastViewport() {
  const dispatch = useAppDispatch()
  const toasts = useAppSelector((state) => state.toast.items)

  return (
    <div className="fixed right-4 top-4 z-50 grid w-80 gap-2" aria-live="polite">
      {toasts.map((toast) => (
        <button
          key={toast.id}
          type="button"
          onClick={() => dispatch(removeToast(toast.id))}
          className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-left text-sm font-semibold text-rose-800 shadow-sm"
        >
          {toast.message}
        </button>
      ))}
    </div>
  )
}

export default ToastViewport
