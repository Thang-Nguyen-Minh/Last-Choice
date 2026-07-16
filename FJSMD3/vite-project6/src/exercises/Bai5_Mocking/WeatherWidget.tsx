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
        <div className="mt-5 flex items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-sky-700 border-t-transparent" />
          <p className="text-slate-600">Đang tải dữ liệu thời tiết...</p>
        </div>
      </article>
    )
  }

  if (error) {
    return (
      <article className="rounded-lg border border-rose-200 bg-rose-50 p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-rose-700">Bài 5 - Mocking Weather API</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">Weather Widget</h3>
        <p className="mt-4 text-sm font-semibold text-rose-700">Lỗi: {error}</p>
      </article>
    )
  }

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold uppercase text-emerald-700">Bài 5 - Mocking Weather API</p>
      <h3 className="mt-2 text-2xl font-bold text-slate-950">Weather Widget</h3>
      {weather && (
        <div className="mt-5 rounded-lg bg-sky-50 p-6 text-center">
          <p className="text-4xl font-bold text-sky-700">{weather.condition}</p>
          <p className="mt-2 text-2xl text-slate-700">{weather.temperature}°C</p>
          <p className="mt-1 text-slate-500">{weather.location}</p>
        </div>
      )}
      <aside className="mt-5 rounded-lg border border-sky-200 bg-sky-50 p-5 text-sm leading-6 text-sky-950">
        <h4 className="font-bold">Kỹ thuật Mocking</h4>
        <p className="mt-2">
          Component tự gọi API mock nội bộ khi mount. Trong unit test, `vi.spyOn(global, 'fetch')`
          ghi đè fetch gốc và trả về dữ liệu tĩnh "Nắng đẹp", nên không phát sinh network request thật.
        </p>
      </aside>
    </article>
  )
}

export default WeatherWidget
