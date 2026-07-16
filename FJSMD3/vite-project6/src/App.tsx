import { useState, type ReactNode } from 'react'
import Bai5Mocking from './exercises/Bai5_Mocking'
import Bai6BuildAnalysis from './exercises/Bai6_BuildAnalysis'
import Bai7RenderTradeoff from './exercises/Bai7_RenderTradeoff'
import Bai8Matchers from './exercises/Bai8_Matchers'
import Bai9TDD from './exercises/Bai9_TDD'
import Bai10CICD from './exercises/Bai10_CICD'

type Exercise = {
  id: number
  title: string
  level: string
  component: ReactNode
}

const exercises: Exercise[] = [
  { id: 5, title: 'Cô lập môi trường mạng bằng Mocking', level: 'Khá', component: <Bai5Mocking /> },
  { id: 6, title: 'Đóng gói và phân tích quá trình Build', level: 'Khá', component: <Bai6BuildAnalysis /> },
  { id: 7, title: 'Đánh giá Trade-off: Ma trận Render', level: 'Giỏi', component: <Bai7RenderTradeoff /> },
  { id: 8, title: 'Phân tích đa giải pháp: Array/Object Matchers', level: 'Giỏi', component: <Bai8Matchers /> },
  { id: 9, title: 'Phát triển tính năng với TDD', level: 'Xuất sắc', component: <Bai9TDD /> },
  { id: 10, title: 'Mini Product: CI/CD Pipeline Automation', level: 'Xuất sắc', component: <Bai10CICD /> },
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
              <p className="text-sm font-semibold uppercase text-emerald-700">Module 1 - Testing & Build Pipeline</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                FJSMD3 Project 6: Bài 5-10
              </h1>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              Dashboard gom các bài về mocking, build production, render strategy, matcher, TDD và CI/CD.
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
                      : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-800'
                  }`}
                >
                  <span className="block">Bài {exercise.id}</span>
                  <span className={`block text-xs ${isActive ? 'text-emerald-50' : 'text-slate-500'}`}>
                    {exercise.level}
                  </span>
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
