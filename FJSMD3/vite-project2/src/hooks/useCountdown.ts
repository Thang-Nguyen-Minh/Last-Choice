import { useCallback, useEffect, useRef, useState } from 'react'

export type CountdownStatus = 'idle' | 'running' | 'paused' | 'finished'

export type CountdownControls = {
  secondsLeft: number
  status: CountdownStatus
  isRunning: boolean
  start: () => void
  pause: () => void
  reset: () => void
}

export function formatCountdown(seconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(seconds))
  const minutes = Math.floor(safeSeconds / 60)
  const remainder = safeSeconds % 60

  return `${minutes.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`
}

export function useCountdown(initialSeconds: number): CountdownControls {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds)
  const [status, setStatus] = useState<CountdownStatus>('idle')
  const intervalRef = useRef<number | null>(null)

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const start = useCallback(() => {
    setStatus((currentStatus) => (secondsLeft > 0 && currentStatus !== 'running' ? 'running' : currentStatus))
  }, [secondsLeft])

  const pause = useCallback(() => {
    setStatus((currentStatus) => (currentStatus === 'running' ? 'paused' : currentStatus))
  }, [])

  const reset = useCallback(() => {
    clearTimer()
    setSecondsLeft(initialSeconds)
    setStatus('idle')
  }, [clearTimer, initialSeconds])

  useEffect(() => {
    if (status !== 'running') {
      clearTimer()
      return
    }

    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((currentSeconds) => {
        if (currentSeconds <= 1) {
          clearTimer()
          setStatus('finished')
          return 0
        }

        return currentSeconds - 1
      })
    }, 1000)

    return clearTimer
  }, [clearTimer, status])

  return {
    secondsLeft,
    status,
    isRunning: status === 'running',
    start,
    pause,
    reset,
  }
}
