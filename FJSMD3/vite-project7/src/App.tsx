import { useState, type ReactNode } from 'react'
import Bai10CheckoutFlow from './exercises/Bai10_CheckoutFlow'
import Bai5FilterSearch from './exercises/Bai5_FilterSearch'
import Bai6Autocomplete from './exercises/Bai6_Autocomplete'
import Bai7Optimistic from './exercises/Bai7_Optimistic'
import Bai8CacheInvalidation from './exercises/Bai8_CacheInvalidation'
import Bai9GlobalNotification from './exercises/Bai9_GlobalNotification'

type Exercise = {
  id: number
  title: string
  level: string
  component: ReactNode
}

const exercises: Exercise[] = [
  { id: 5, title: 'Đồng bộ Client State & Server State', level: 'Khá', component: <Bai5FilterSearch /> },
  { id: 6, title: 'Autocomplete Search chống spam API', level: 'Giỏi', component: <Bai6Autocomplete /> },
  { id: 7, title: 'Optimistic Updates', level: 'Giỏi', component: <Bai7Optimistic /> },
  { id: 8, title: 'Mutations & InvalidatesTags', level: 'Xuất sắc', component: <Bai8CacheInvalidation /> },
  { id: 9, title: 'Mini Notification bắt lỗi Global', level: 'Xuất sắc', component: <Bai9GlobalNotification /> },
  { id: 10, title: 'Mini E-commerce Checkout', level: 'Xuất sắc', component: <Bai10CheckoutFlow /> },
]

function App() {
  const [activeId, setActiveId] = useState(5)
  const activeExercise = exercises.find((exercise) => exercise.id === activeId) ?? exercises[0]

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-emerald-700">Module 1 - Redux Toolkit & RTK Query</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">FJSMD3 Project 7: Bài 5-10</h1>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              Dashboard gom các bài về Redux Slice, RTK Query, debounce, optimistic update, cache invalidation,
              middleware và checkout flow.
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
                    isActive ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-300'
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
