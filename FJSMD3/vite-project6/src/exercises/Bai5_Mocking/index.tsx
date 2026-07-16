import WeatherWidget from './WeatherWidget'

function Bai5Mocking() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <WeatherWidget />
      <aside className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-sm leading-6 text-emerald-950">
        <h4 className="font-bold">Yêu cầu Bài 5</h4>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li>`WeatherWidget` tự gọi API khi mount.</li>
          <li>Unit test dùng `vi.spyOn(global, 'fetch')` để mock fetch.</li>
          <li>Mock trả về dữ liệu tĩnh: "Nắng đẹp".</li>
          <li>Assertion xác nhận UI render dữ liệu mock và fetch chỉ gọi đúng `/api/weather`.</li>
        </ul>
      </aside>
    </section>
  )
}

export default Bai5Mocking
