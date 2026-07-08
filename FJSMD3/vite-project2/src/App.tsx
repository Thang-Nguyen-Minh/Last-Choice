import { useState, type ReactNode } from 'react'
import Bai10PerformanceMemo from './exercises/Bai10_PerformanceMemo'
import Bai5ThemeContext from './exercises/Bai5_ThemeContext'
import Bai6UrlSearchParams from './exercises/Bai6_UrlSearchParams'
import Bai7CustomCountdownHook from './exercises/Bai7_CustomCountdownHook'
import Bai8CartReducer from './exercises/Bai8_CartReducer'
import Bai9ProtectedRoutes from './exercises/Bai9_ProtectedRoutes'

type Exercise = {
  id: number
  title: string
  level: string
  component: ReactNode
}

const exercises: Exercise[] = [
  { id: 5, title: 'Context API Theme', level: 'Khá', component: <Bai5ThemeContext /> },
  { id: 6, title: 'URL Search Params', level: 'Khá', component: <Bai6UrlSearchParams /> },
  { id: 7, title: 'Custom Countdown Hook', level: 'Giỏi', component: <Bai7CustomCountdownHook /> },
  { id: 8, title: 'Cart useReducer', level: 'Giỏi', component: <Bai8CartReducer /> },
  { id: 9, title: 'Protected Routes', level: 'Xuất sắc', component: <Bai9ProtectedRoutes /> },
  { id: 10, title: 'useMemo & useCallback', level: 'Xuất sắc', component: <Bai10PerformanceMemo /> },
]

function App() {
  const [activeId, setActiveId] = useState(5)
  const activeExercise = exercises.find((exercise) => exercise.id === activeId) ?? exercises[0]

  return (
    <main className="min-h-screen bg-[#f6f7f2] text-neutral-900">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-emerald-700">Module 1 - React State Architecture</p>
              <h1 className="mt-1 text-3xl font-bold text-neutral-950 sm:text-4xl">FJSMD3 Exercises 5-10</h1>
            </div>
            <p className="max-w-xl text-sm leading-6 text-neutral-600">
              Một Vite project gom các bài state nâng cao: Context, URL state, custom hook, reducer, protected route và memoization.
            </p>
          </div>

          <nav aria-label="Danh sách bài tập" className="flex gap-2 overflow-x-auto pb-1">
            {exercises.map((exercise) => {
              const isActive = exercise.id === activeId

              return (
                <button
                  key={exercise.id}
                  type="button"
                  data-testid={`tab-bai-${exercise.id}`}
                  onClick={() => setActiveId(exercise.id)}
                  className={`shrink-0 rounded-lg border px-4 py-2 text-left text-sm font-semibold transition ${
                    isActive
                      ? 'border-emerald-700 bg-emerald-700 text-white shadow-sm'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:border-sky-500 hover:text-neutral-950'
                  }`}
                >
                  <span className="block">Bài {exercise.id}</span>
                  <span className={`block text-xs ${isActive ? 'text-emerald-50' : 'text-neutral-500'}`}>{exercise.level}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-5 border-b border-neutral-200 pb-4">
          <p className="text-sm font-semibold text-sky-700">Bài {activeExercise.id}</p>
          <h2 className="text-2xl font-bold text-neutral-950">{activeExercise.title}</h2>
        </div>
        <div className="min-h-[600px]" data-testid="exercise-panel">
          {activeExercise.component}
        </div>
      </section>
    </main>
  )
}

export default App
