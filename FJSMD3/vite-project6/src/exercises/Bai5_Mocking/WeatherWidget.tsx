import { useEffect, useState } from 'react'

export type WeatherData = {
  condition: string
  temperature: number
  location: string
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch('/api/weather.json')

        if (!response.ok) {
          throw new Error('Không lấy được dữ liệu thời tiết')
        }

        const data = (await response.json()) as WeatherData
        setWeather(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Lỗi không xác định')
      } finally {
        setLoading(false)
      }
    }

    void fetchWeather()
  }, [])

  if (loading) {
    return (
      <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-emerald-700">Bài 5 - Mocking Weather API</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">Weather Widget</h3>
        <div className="mt-6 flex items-center gap-3 rounded-lg bg-slate-50 p-4">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-sky-700 border-t-transparent" />
          <p className="text-sm font-semibold text-slate-600">Đang tải dữ liệu thời tiết...</p>
        </div>
      </article>
    )
  }

  if (error) {
    return (
      <article className="rounded-lg border border-rose-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-rose-700">Bài 5 - Mocking Weather API</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">Weather Widget</h3>
        <div className="mt-6 rounded-lg border border-rose-200 bg-rose-50 p-4">
          <p className="text-sm font-semibold text-rose-700">Lỗi: {error}</p>
        </div>
      </article>
    )
  }

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold uppercase text-emerald-700">Bài 5 - Mocking Weather API</p>
      <h3 className="mt-2 text-2xl font-bold text-slate-950">Weather Widget</h3>

      {weather && (
        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_180px]">
          <div className="rounded-lg border border-sky-100 bg-sky-50 p-5">
            <p className="text-sm font-semibold uppercase text-sky-700">Điều kiện hiện tại</p>
            <p className="mt-3 text-4xl font-bold text-sky-800">{weather.condition}</p>
            <p className="mt-2 text-sm text-slate-600">{weather.location}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 text-center">
            <p className="text-sm font-semibold uppercase text-slate-500">Nhiệt độ</p>
            <p className="mt-3 text-4xl font-bold text-slate-950">{weather.temperature}°C</p>
          </div>
        </div>
      )}

      <aside className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
        Component dùng mock API nội bộ khi chạy thật. Trong unit test, `vi.spyOn(global, 'fetch')` ghi đè fetch gốc
        và trả về dữ liệu tĩnh "Nắng đẹp", nên không phát sinh request mạng ngoài.
      </aside>
    </article>
  )
}

export default WeatherWidget
