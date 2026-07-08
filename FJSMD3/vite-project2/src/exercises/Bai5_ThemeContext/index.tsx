import { ThemeProvider } from '../../contexts/ThemeContext'
import { ThemeConsumerOutsideProvider, ThemeFooter, ThemeHeader, ThemeMainContent } from './ThemeParts'

function Bai5ThemeContext() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <ThemeProvider>
        <div className="grid gap-4 rounded-lg bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold uppercase text-emerald-700">Bài 5 - Context API</p>
          <ThemeHeader />
          <ThemeMainContent />
          <ThemeFooter />
        </div>
      </ThemeProvider>

      <aside className="grid gap-4">
        <div className="rounded-lg border border-neutral-200 bg-white p-5 text-sm leading-6 text-neutral-700 shadow-sm">
          <h4 className="font-bold text-neutral-950">Kiến trúc</h4>
          <p className="mt-2">ThemeProvider giữ state theme và toggleTheme. Header, MainContent, Footer subscribe bằng useThemeContext.</p>
          <p className="mt-3">Context type là ThemeContextValue, giá trị raw có thể undefined nhưng hook trả safe fallback khi thiếu Provider.</p>
        </div>
        <ThemeConsumerOutsideProvider />
      </aside>
    </section>
  )
}

export default Bai5ThemeContext
