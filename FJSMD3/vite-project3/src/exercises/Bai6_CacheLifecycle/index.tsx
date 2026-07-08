import { useQuery } from '@tanstack/react-query'
import { fetchRevenue, formatCurrency } from '../../api/mockApi'
import { REVENUE_STALE_TIME } from './queryOptions'

function Bai6CacheLifecycle() {
  const revenueQuery = useQuery({
    queryKey: ['monthly-revenue'],
    queryFn: fetchRevenue,
    staleTime: REVENUE_STALE_TIME,
  })

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_400px]">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-emerald-700">Bài 6 - Cache Lifecycle</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">Dashboard doanh thu tháng</h3>
        <div className="mt-6 rounded-lg bg-slate-50 p-5">
          {revenueQuery.isLoading ? <p>Đang tải doanh thu...</p> : null}
          {revenueQuery.data ? (
            <>
              <p className="text-sm text-slate-600">Tháng {revenueQuery.data.month}</p>
              <p className="mt-2 text-4xl font-bold text-emerald-700">{formatCurrency(revenueQuery.data.amount)}</p>
              <p className="mt-2 text-sm text-slate-600">{revenueQuery.data.orders} đơn hàng</p>
            </>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => revenueQuery.refetch()}
          className="mt-5 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white"
        >
          Làm mới dữ liệu
        </button>
        {revenueQuery.isFetching && !revenueQuery.isLoading ? <span className="ml-3 text-sm text-sky-700">Đang force refresh...</span> : null}
      </div>

      <aside className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
        <h4 className="font-bold">Fetching - Fresh - Stale - Inactive</h4>
        <p className="mt-2">Fetching: lần gọi API đang chạy. Fresh: dữ liệu được tin cậy trong 5 phút nhờ staleTime.</p>
        <p className="mt-3">Stale: sau 5 phút mới cần revalidate tự động. Inactive: khi không còn component subscribe.</p>
        <p className="mt-3">Nút Làm mới dùng refetch để bỏ qua staleTime.</p>
      </aside>
    </section>
  )
}

export default Bai6CacheLifecycle
