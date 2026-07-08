import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchInventory, updateInventoryQuantity, type InventoryItem } from '../../api/mockApi'
import { useInventoryUiStore } from '../../stores/inventoryUiStore'

const inventoryKey = ['inventory']

function InventorySidebar({ item }: { item: InventoryItem }) {
  const queryClient = useQueryClient()
  const closeSidebar = useInventoryUiStore((state) => state.closeSidebar)
  const [quantity, setQuantity] = useState(String(item.quantity))
  const [localError, setLocalError] = useState('')
  const mutation = useMutation({
    mutationFn: ({ id, nextQuantity }: { id: string; nextQuantity: number }) => updateInventoryQuantity(id, nextQuantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inventoryKey })
      closeSidebar()
    },
    onError: (error) => {
      setLocalError(error instanceof Error ? error.message : 'Cập nhật thất bại')
    },
  })

  function handleSave() {
    const nextQuantity = Number(quantity)
    if (!Number.isFinite(nextQuantity) || nextQuantity < 0) {
      setLocalError('Số lượng không được âm')
      return
    }

    mutation.mutate({ id: item.id, nextQuantity })
  }

  return (
    <>
      <h4 className="text-xl font-bold text-slate-950">Sidebar chỉnh kho</h4>
      <p className="mt-2 text-sm text-slate-600">{item.name}</p>
      <label className="mt-5 grid gap-2 text-sm font-semibold">
        Số lượng mới
        <input
          aria-label="Số lượng mới"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 font-normal"
        />
      </label>
      {localError ? (
        <p role="alert" className="mt-3 text-sm font-semibold text-rose-700">
          {localError}
        </p>
      ) : null}
      <div className="mt-5 flex gap-2">
        <button type="button" onClick={handleSave} className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white">
          Lưu
        </button>
        <button type="button" onClick={closeSidebar} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold">
          Đóng
        </button>
      </div>
    </>
  )
}

function Bai10InventoryModule() {
  const selectedItem = useInventoryUiStore((state) => state.selectedItem)
  const openSidebar = useInventoryUiStore((state) => state.openSidebar)
  const inventoryQuery = useQuery({
    queryKey: inventoryKey,
    queryFn: fetchInventory,
  })

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-emerald-700">Bài 10 - End-to-End State</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">Kiểm kê kho</h3>
        <div className="mt-5 overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-3 py-2">SKU</th>
                <th className="px-3 py-2">Tên hàng</th>
                <th className="px-3 py-2">Kho</th>
                <th className="px-3 py-2">SL</th>
                <th className="px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {(inventoryQuery.data ?? []).map((item) => (
                <tr key={item.id} className="border-t border-slate-200">
                  <td className="px-3 py-2">{item.id}</td>
                  <td className="px-3 py-2">{item.name}</td>
                  <td className="px-3 py-2">{item.warehouse}</td>
                  <td className="px-3 py-2">{item.quantity}</td>
                  <td className="px-3 py-2">
                    <button type="button" onClick={() => openSidebar(item)} className="font-semibold text-sky-700">
                      Sửa số lượng
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        {selectedItem ? (
          <InventorySidebar key={selectedItem.id} item={selectedItem} />
        ) : (
          <div className="text-sm leading-6 text-slate-600">
            <h4 className="font-bold text-slate-950">Data flow</h4>
            <p className="mt-2">Query lấy inventory. Zustand giữ selectedItem. Mutation lưu số lượng, success thì invalidate cache và đóng sidebar.</p>
          </div>
        )}
      </aside>
    </section>
  )
}

export default Bai10InventoryModule
