import { useQuery } from '@tanstack/react-query'
import { fetchCustomers } from '../../api/mockApi'

function Bai7LoadingUx() {
  const customersQuery = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
    staleTime: 10 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000,
  })

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_440px]">
      <div className="relative rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-emerald-700">Bài 7 - isLoading vs isFetching</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">Bảng dữ liệu khách hàng</h3>
        {customersQuery.isFetching && !customersQuery.isLoading ? (
          <span className="absolute right-5 top-5 rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
            Đang đồng bộ nền
          </span>
        ) : null}

        {customersQuery.isLoading ? (
          <div aria-label="Skeleton khách hàng" className="mt-6 grid gap-3">
            <div className="h-10 rounded-lg bg-slate-100" />
            <div className="h-10 rounded-lg bg-slate-100" />
            <div className="h-10 rounded-lg bg-slate-100" />
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-3 py-2">Mã</th>
                  <th className="px-3 py-2">Tên</th>
                  <th className="px-3 py-2">Segment</th>
                </tr>
              </thead>
              <tbody>
                {(customersQuery.data ?? []).map((customer) => (
                  <tr key={customer.id} className="border-t border-slate-200">
                    <td className="px-3 py-2">{customer.id}</td>
                    <td className="px-3 py-2">{customer.name}</td>
                    <td className="px-3 py-2">{customer.segment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button
          type="button"
          onClick={() => customersQuery.refetch()}
          className="mt-5 rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white"
        >
          Mô phỏng background refetch
        </button>
      </div>

      <aside className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-700 shadow-sm">
        <h4 className="font-bold text-slate-950">So sánh UX</h4>
        <p className="mt-2">Giải pháp 1: spinner toàn màn hình cho mọi lần tải, code đơn giản nhưng gây giật trắng khi refetch nền.</p>
        <p className="mt-3">Giải pháp 2: Skeleton cho isLoading, chấm nhỏ cho isFetching. UX mượt hơn vì giữ cache cũ trên màn hình.</p>
        <p className="mt-3 font-semibold text-emerald-700">Lựa chọn: tách hard loading và soft loading.</p>
      </aside>
    </section>
  )
}

export default Bai7LoadingUx
