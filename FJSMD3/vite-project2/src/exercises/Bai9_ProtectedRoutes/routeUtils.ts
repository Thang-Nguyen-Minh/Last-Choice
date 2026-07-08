import { type Location } from 'react-router-dom'

type LoginState = {
  from?: Location
}

export function getRedirectTarget(state: LoginState | null | undefined): string {
  return state?.from?.pathname ?? '/classroom'
}
