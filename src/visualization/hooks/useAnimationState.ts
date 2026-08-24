import { useCallback, useState } from 'react'

export type AnimationStatus = 'idle' | 'playing' | 'paused' | 'completed'

export function useAnimationState(stepCount: number) {
  const [status, setStatus] = useState<AnimationStatus>('idle')
  const [step, setStep] = useState(0)
  const reset = useCallback(() => {
    setStep(0)
    setStatus('idle')
  }, [])
  const play = useCallback(() => setStatus('playing'), [])
  const pause = useCallback(() => setStatus('paused'), [])
  const nextStep = useCallback(
    () =>
      setStep((current) => {
        const next = Math.min(current + 1, Math.max(stepCount - 1, 0))
        if (next === stepCount - 1) setStatus('completed')
        return next
      }),
    [stepCount],
  )
  const previousStep = useCallback(() => {
    setStep((current) => Math.max(current - 1, 0))
    setStatus('paused')
  }, [])
  return { status, step, play, pause, reset, nextStep, previousStep }
}
