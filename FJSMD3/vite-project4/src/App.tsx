import { useState, type ReactNode } from 'react'
import Bai10GradeKiosk from './exercises/Bai10_GradeKiosk'
import Bai5FormikYup from './exercises/Bai5_FormikYup'
import Bai6RhfUncontrolled from './exercises/Bai6_RhfUncontrolled'
import Bai7DependentSchema from './exercises/Bai7_DependentSchema'
import Bai8PerformanceReport from './exercises/Bai8_PerformanceReport'
import Bai9DynamicFields from './exercises/Bai9_DynamicFields'

type Exercise = {
  id: number
  title: string
  level: string
  component: ReactNode
}

const exercises: Exercise[] = [
  { id: 5, title: 'Formik & Yup', level: 'Khá', component: <Bai5FormikYup /> },
  { id: 6, title: 'RHF Uncontrolled', level: 'Khá', component: <Bai6RhfUncontrolled /> },
  { id: 7, title: 'Dependent Schema', level: 'Giỏi', component: <Bai7DependentSchema /> },
  { id: 8, title: 'Performance Report', level: 'Giỏi', component: <Bai8PerformanceReport /> },
  { id: 9, title: 'Dynamic Fields', level: 'Xuất sắc', component: <Bai9DynamicFields /> },
  { id: 10, title: 'Grade Kiosk', level: 'Xuất sắc', component: <Bai10GradeKiosk /> },
]

function App() {
  const [activeId, setActiveId] = useState(5)
  const activeExercise = exercises.find((exercise) => exercise.id === activeId) ?? exercises[0]

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-emerald-700">Module 1 - Form Architecture</p>
              <h1 className="mt-1 text-3xl font-bold text-slate-950 sm:text-4xl">FJSMD3 Form Exercises</h1>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              Một Vite project gom Bài 5-10: Formik, Yup, React Hook Form, dynamic fields, resolver và error handling.
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
                    isActive ? 'border-emerald-700 bg-emerald-700 text-white shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:border-sky-500'
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
