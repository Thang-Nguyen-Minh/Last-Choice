import { useState, type ReactNode } from 'react'
import Bai10ResilientClient from './exercises/Bai10_ResilientClient'
import Bai5CrudContacts from './exercises/Bai5_CrudContacts'
import Bai6PutPatch from './exercises/Bai6_PutPatch'
import Bai7RequestInterceptor from './exercises/Bai7_RequestInterceptor'
import Bai8GlobalErrorHandling from './exercises/Bai8_GlobalErrorHandling'
import Bai9RequestCancellation from './exercises/Bai9_RequestCancellation'

type Exercise = {
  id: number
  title: string
  level: string
  component: ReactNode
}

const exercises: Exercise[] = [
  { id: 5, title: 'Mock Server CRUD', level: 'Khá', component: <Bai5CrudContacts /> },
  { id: 6, title: 'PUT vs PATCH', level: 'Khá', component: <Bai6PutPatch /> },
  { id: 7, title: 'Request Interceptor', level: 'Giỏi', component: <Bai7RequestInterceptor /> },
  { id: 8, title: 'Global Error Handling', level: 'Giỏi', component: <Bai8GlobalErrorHandling /> },
  { id: 9, title: 'Request Cancellation', level: 'Xuất sắc', component: <Bai9RequestCancellation /> },
  { id: 10, title: 'Resilient API Client', level: 'Xuất sắc', component: <Bai10ResilientClient /> },
]

function App() {
  const [activeId, setActiveId] = useState(5)
  const activeExercise = exercises.find((exercise) => exercise.id === activeId) ?? exercises[0]

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-emerald-700">Module 1 - Axios API Architecture</p>
              <h1 className="mt-1 text-3xl font-bold text-slate-950 sm:text-4xl">FJSMD3 API Exercises</h1>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">Một Vite project gom Bài 5-10: json-server, Axios CRUD, interceptors, cancellation và resilient client.</p>
          </div>
          <nav aria-label="Danh sách bài tập" className="flex gap-2 overflow-x-auto pb-1">
            {exercises.map((exercise) => {
              const isActive = exercise.id === activeId
              return (
                <button key={exercise.id} type="button" data-testid={`tab-bai-${exercise.id}`} onClick={() => setActiveId(exercise.id)} className={`shrink-0 rounded-lg border px-4 py-2 text-left text-sm font-semibold ${isActive ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-slate-200 bg-white text-slate-700'}`}>
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
        <div className="min-h-[600px]" data-testid="exercise-panel">{activeExercise.component}</div>
      </section>
    </main>
  )
}

export default App
