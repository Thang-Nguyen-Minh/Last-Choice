export const DEFAULT_POMODORO_SECONDS = 25 * 60

export type PomodoroStatus = 'idle' | 'running' | 'paused' | 'finished'

export function formatTime(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds))
  const minutes = Math.floor(safeSeconds / 60)
  const seconds = safeSeconds % 60

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

export function getNextPomodoroTick(remainingSeconds: number): {
  remainingSeconds: number
  status: PomodoroStatus
} {
  if (remainingSeconds <= 1) {
    return { remainingSeconds: 0, status: 'finished' }
  }

  return { remainingSeconds: remainingSeconds - 1, status: 'running' }
}
