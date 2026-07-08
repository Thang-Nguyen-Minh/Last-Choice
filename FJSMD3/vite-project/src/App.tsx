import { useState, type ReactNode } from 'react'
import Bai10FaqAccordion from './exercises/Bai10_FaqAccordion'
import Bai5PricingTable from './exercises/Bai5_PricingTable'
import Bai6LoginForm from './exercises/Bai6_LoginForm/LoginForm'
import Bai7WelcomeBanner from './exercises/Bai7_WelcomeBanner/WelcomeBanner'
import Bai8ScoreContainer from './exercises/Bai8_ScoreBoard/ScoreContainer'
import Bai9PomodoroTimer from './exercises/Bai9_PomodoroTimer/PomodoroTimer'

type Exercise = {
  id: number
  title: string
  level: string
  component: ReactNode
}

const exercises: Exercise[] = [
  { id: 5, title: 'Pricing Table', level: 'Khá', component: <Bai5PricingTable /> },
  { id: 6, title: 'Controlled Login Form', level: 'Khá', component: <Bai6LoginForm /> },
  { id: 7, title: 'Conditional Rendering', level: 'Giỏi', component: <Bai7WelcomeBanner /> },
  { id: 8, title: 'Lifecycle Performance', level: 'Giỏi', component: <Bai8ScoreContainer /> },
  { id: 9, title: 'Pomodoro Timer', level: 'Xuất sắc', component: <Bai9PomodoroTimer /> },
  { id: 10, title: 'FAQ Accordion', level: 'Xuất sắc', component: <Bai10FaqAccordion /> },
]

function App() {
  const [activeId, setActiveId] = useState(5)
  const activeExercise = exercises.find((exercise) => exercise.id === activeId) ?? exercises[0]

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-zinc-900">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-teal-700">Module 1 - React TypeScript</p>
              <h1 className="mt-1 text-3xl font-bold text-zinc-950 sm:text-4xl">
                React TypeScript Assignments
              </h1>
            </div>
            <p className="max-w-xl text-sm leading-6 text-zinc-600">
              Một Vite project duy nhất gom Bài 5 đến Bài 10, chia tab rõ ràng để xem code và kiểm tra từng luồng tương tác.
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
                      ? 'border-teal-700 bg-teal-700 text-white shadow-sm'
                      : 'border-zinc-200 bg-white text-zinc-700 hover:border-amber-500 hover:text-zinc-950'
                  }`}
                >
                  <span className="block">Bài {exercise.id}</span>
                  <span className={`block text-xs ${isActive ? 'text-teal-50' : 'text-zinc-500'}`}>{exercise.level}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col gap-1 border-b border-zinc-200 pb-4">
          <p className="text-sm font-semibold text-rose-700">Bài {activeExercise.id}</p>
          <h2 className="text-2xl font-bold text-zinc-950">{activeExercise.title}</h2>
        </div>

        <div className="min-h-[560px]" data-testid="exercise-panel">
          {activeExercise.component}
        </div>
      </section>
    </main>
  )
}

export default App
