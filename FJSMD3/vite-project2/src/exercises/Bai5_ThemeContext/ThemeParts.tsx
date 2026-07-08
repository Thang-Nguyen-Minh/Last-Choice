import { useThemeContext } from '../../contexts/ThemeContext'

export function ThemeHeader() {
  const { isDark, toggleTheme } = useThemeContext()

  return (
    <header className="flex items-center justify-between gap-4 rounded-lg border border-current/10 bg-current/5 p-4">
      <div>
        <h3 className="text-xl font-bold">Learning Platform</h3>
        <p className="text-sm opacity-80">Toggle nằm ở Header, dữ liệu theme dùng chung qua Context.</p>
      </div>
      <button
        type="button"
        onClick={toggleTheme}
        className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
      >
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </button>
    </header>
  )
}

export function ThemeMainContent() {
  const { theme } = useThemeContext()

  return (
    <section className="rounded-lg border border-current/10 bg-current/5 p-4">
      <h4 className="font-bold">MainContent subscribe trực tiếp</h4>
      <p className="mt-2 text-sm opacity-80">Theme hiện tại: {theme}</p>
    </section>
  )
}

export function ThemeFooter() {
  const { isDark } = useThemeContext()

  return (
    <footer className="rounded-lg border border-current/10 bg-current/5 p-4 text-sm opacity-80">
      Footer cũng dùng Context, không nhận props từ Header hay MainContent. Palette: {isDark ? 'ban đêm' : 'ban ngày'}.
    </footer>
  )
}

export function ThemeConsumerOutsideProvider() {
  const { isInsideProvider, theme } = useThemeContext()

  return (
    <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">
      Consumer ngoài Provider: {isInsideProvider ? theme : 'Safe fallback: light theme, không null/undefined'}
    </div>
  )
}
