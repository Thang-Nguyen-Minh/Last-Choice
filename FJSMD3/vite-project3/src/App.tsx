import { useState, type ReactNode } from 'react'
import Bai10InventoryModule from './exercises/Bai10_InventoryModule'
import Bai5FilterDashboard from './exercises/Bai5_FilterDashboard'
import Bai6CacheLifecycle from './exercises/Bai6_CacheLifecycle'
import Bai7LoadingUx from './exercises/Bai7_LoadingUx'
import Bai8OptimisticUpdates from './exercises/Bai8_OptimisticUpdates'
import Bai9ZustandSlices from './exercises/Bai9_ZustandSlices'

type Exercise = {
  id: number
  title: string
  level: string
  component: ReactNode
}

const exercises: Exercise[] = [
  { id: 5, title: 'Filter Dashboard', level: 'Khá', component: <Bai5FilterDashboard /> },
  { id: 6, title: 'Cache Lifecycle', level: 'Khá', component: <Bai6CacheLifecycle /> },
  { id: 7, title: 'Loading UX', level: 'Giỏi', component: <Bai7LoadingUx /> },
  { id: 8, title: 'Optimistic Updates', level: 'Giỏi', component: <Bai8OptimisticUpdates /> },
  { id: 9, title: 'Zustand Slices', level: 'Xuất sắc', component: <Bai9ZustandSlices /> },
  { id: 10, title: 'Inventory Module', level: 'Xuất sắc', component: <Bai10InventoryModule /> },
]

function App() {
  const [activeId, setActiveId] = useState(5)
  const activeExercise = exercises.find((exercise) => exercise.id === activeId) ?? exercises[0]

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-emerald-700">Module 1 - Server State Architecture</p>
              <h1 className="mt-1 text-3xl font-bold text-slate-950 sm:text-4xl">FJSMD3 Query & Zustand Exercises</h1>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              Một Vite project gom Bài 5-10: Zustand client state, TanStack Query server state, cache lifecycle, optimistic update và inventory flow.
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
                      : 'border-slate-200 bg-white text-slate-700 hover:border-sky-500 hover:text-slate-950'
                  }`}
                >
                  <span className="block">Bài {exercise.id}</span>
                  <span className={`block text-xs ${isActive ? 'text-emerald-50' : 'text-slate-500'}`}>{exercise.level}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-5 border-b border-slate-200 pb-4">
          <p className="text-sm font-semibold text-sky-700">Bài {activeExercise.id}</p>
          <h2 className="text-2xl font-bold text-slate-950">{activeExercise.title}</h2>
        </div>
        <div className="min-h-[600px]" data-testid="exercise-panel">
          {activeExercise.component}
        </div>
      </section>
    </main>
  )
}

export default App
