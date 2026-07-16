import Bai8Matchers from './Bai8Matchers'

function Bai8MatchersWrapper() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <Bai8Matchers />
      <aside className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-sm leading-6 text-emerald-950">
        <h4 className="font-bold">Yêu cầu Bài 8</h4>
        <ul className="mt-3 space-y-2 list-disc list-inside">
          <li>Giải pháp 1: <code className="bg-emerald-100 px-1 rounded">toContainEqual()</code> kiểm tra Admin</li>
          <li>Giải pháp 2: Vòng lặp + <code className="bg-emerald-100 px-1 rounded">toEqual()</code> từng phần tử</li>
          <li>Bẫy: Admin có thêm <code className="bg-emerald-100 px-1 rounded">lastLoginDate</code> ngẫu nhiên</li>
          <li>Giải pháp: <code className="bg-emerald-100 px-1 rounded">expect.objectContaining()</code></li>
        </ul>
      </aside>
    </section>
  )
}

export default Bai8MatchersWrapper
