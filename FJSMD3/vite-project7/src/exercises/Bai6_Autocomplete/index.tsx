import { skipToken } from '@reduxjs/toolkit/query'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setKeyword } from '../../features/search/searchSlice'
import { useGetProductsQuery } from '../../services/apiSlice'
import { useDebouncedValue } from './useDebouncedValue'

function Bai6Autocomplete() {
  const dispatch = useAppDispatch()
  const keyword = useAppSelector((state) => state.search.keyword)
  const [draft, setDraft] = useState('')
  const debounced = useDebouncedValue(draft, 350)
  const { data = [], isFetching, isUninitialized } = useGetProductsQuery(keyword ? keyword : skipToken)

  useEffect(() => {
    dispatch(setKeyword(debounced))
  }, [debounced, dispatch])

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-emerald-700">Bài 6 - Debounce Autocomplete</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">Chống spam API khi gõ nhanh</h3>

        <input
          className="mt-5 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-600"
          placeholder="Gõ Macbook thật nhanh"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />

        <div className="mt-4 grid gap-3 text-sm md:grid-cols-3">
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="font-semibold">Input tức thời</p>
            <p>{draft || '(rỗng)'}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="font-semibold">Debounced 350ms</p>
            <p>{debounced || '(rỗng)'}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="font-semibold">RTK Query</p>
            <p>{isUninitialized ? 'skip' : isFetching ? 'fetching' : `${data.length} kết quả`}</p>
          </div>
        </div>

        <ul className="mt-5 grid gap-2">
          {data.map((product) => (
            <li key={product.id} className="rounded-lg border border-slate-200 p-3 text-sm">
              <span className="font-semibold">{product.name}</span>
              <span className="ml-2 text-slate-500">{product.category}</span>
            </li>
          ))}
        </ul>
      </div>

      <aside className="rounded-lg border border-sky-200 bg-sky-50 p-5 text-sm leading-6 text-sky-950">
        <h4 className="font-bold">So sánh giải pháp</h4>
        <p className="mt-2">Debounce trong component dễ hiểu, giảm request từ 7 lần xuống 1 lần khi gõ "Macbook" nhanh.</p>
        <p className="mt-3">RTK Query `skipToken` vẫn được dùng để chặn keyword rỗng. Với app lớn có thể thêm abort/cancel request cũ.</p>
      </aside>
    </section>
  )
}

export default Bai6Autocomplete
