import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchViolationOrders, markViolationResolved, type ViolationOrder } from '../../api/mockApi'

const violationsKey = ['violation-orders']

function Bai8OptimisticUpdates() {
  const queryClient = useQueryClient()
  const violationsQuery = useQuery({
    queryKey: violationsKey,
    queryFn: fetchViolationOrders,
  })

  const mutation = useMutation({
    mutationFn: markViolationResolved,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: violationsKey })
      const previousOrders = queryClient.getQueryData<ViolationOrder[]>(violationsKey)
      queryClient.setQueryData<ViolationOrder[]>(violationsKey, (currentOrders = []) =>
        currentOrders.map((order) => (order.id === id ? { ...order, resolved: true } : order)),
      )
      return { previousOrders }
    },
    onError: (_error, _id, context) => {
      queryClient.setQueryData(violationsKey, context?.previousOrders)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: violationsKey })
    },
  })

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-emerald-700">Bài 8 - Optimistic Updates</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">Đánh dấu đơn vi phạm đã xử lý</h3>
        <div className="mt-5 grid gap-3">
          {(violationsQuery.data ?? []).map((order) => (
            <article key={order.id} className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
              <div>
                <p className="font-semibold text-slate-950">{order.title}</p>
                <p className={`mt-1 text-sm font-semibold ${order.resolved ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {order.resolved ? 'Đã xử lý' : 'Chưa xử lý'}
                </p>
              </div>
              <button
                type="button"
                disabled={order.resolved}
                onClick={() => mutation.mutate(order.id)}
                className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white disabled:bg-slate-300"
              >
                Đánh dấu đã xử lý
              </button>
            </article>
          ))}
        </div>
      </div>

      <aside className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-700 shadow-sm">
        <h4 className="font-bold text-slate-950">Pessimistic vs Optimistic</h4>
        <p className="mt-2">Pessimistic: đợi server 200 OK mới đổi màu, ít rủi ro nhưng UI chậm.</p>
        <p className="mt-3">Optimistic: onMutate backup cache và đổi UI ngay t=0. Nếu lỗi, onError rollback. onSettled invalidate để đồng bộ lại.</p>
      </aside>
    </section>
  )
}

export default Bai8OptimisticUpdates
