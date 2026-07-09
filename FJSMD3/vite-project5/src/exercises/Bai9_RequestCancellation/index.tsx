import { useRef, useState } from 'react'
import { isIntentionalCancel, searchContacts, type SearchResult } from '../../api/liveSearchApi'

function Bai9RequestCancellation() {
  const controllerRef = useRef<AbortController | null>(null)
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [status, setStatus] = useState('Chưa tìm kiếm')

  async function handleSearch(value: string) {
    setKeyword(value)
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller
    setStatus('Đang gửi request mới')

    try {
      const nextResults = await searchContacts(value, controller.signal)
      setResults(nextResults)
      setStatus('Hoàn tất request mới nhất')
    } catch (error) {
      if (isIntentionalCancel(error)) {
        setStatus('Request cũ đã bị hủy chủ động')
        return
      }
      setStatus('Lỗi mạng thật')
    }
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-emerald-700">Bài 9 - AbortController</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">Tìm kiếm Live chống race condition</h3>
        <input aria-label="Tìm kiếm live" value={keyword} onChange={(event) => handleSearch(event.target.value)} className="mt-5 w-full rounded-lg border border-slate-300 px-3 py-2" />
        <p className="mt-4 text-sm font-semibold">{status}</p>
        <ul className="mt-4 grid gap-2">
          {results.map((item) => <li key={item.id} className="rounded-lg bg-slate-50 p-3 text-sm">{item.label}</li>)}
        </ul>
      </div>
      <aside className="rounded-lg border border-sky-200 bg-sky-50 p-5 text-sm leading-6 text-sky-950">
        <h4 className="font-bold">Sequence diagram</h4>
        <p className="mt-2">Key A -&gt; request A bay -&gt; Key B -&gt; abort A -&gt; request B bay -&gt; catch A bằng axios.isCancel -&gt; chỉ render kết quả B.</p>
      </aside>
    </section>
  )
}

export default Bai9RequestCancellation
